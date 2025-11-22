const path = require('path');
const fs = require('fs/promises');
const http = require('http');
// Use a minimal static file server implemented with Node's http/fs modules
const { execSync } = require('child_process');

(async () => {
  try {
    const projectRoot = path.resolve(__dirname, '..');
    const distDir = path.join(projectRoot, 'dist');

    console.log('1) Running build (vite build)');
    execSync('npm run build', { stdio: 'inherit', cwd: projectRoot });

    // Start a minimal static server to serve dist
    console.log('2) Starting static server to serve dist/ on http://localhost:5000');
    const serve = (req, res) => {
      try {
        const reqUrl = decodeURIComponent(req.url.split('?')[0]);
        let filePath = path.join(distDir, reqUrl);
        // If path is directory or ends with /, serve index.html
        (async () => {
          try {
            const stat = await fs.stat(filePath).catch(() => null);
            if (!stat || stat.isDirectory()) {
              filePath = path.join(distDir, 'index.html');
            }
            const data = await fs.readFile(filePath);
            const ext = path.extname(filePath).toLowerCase();
            const map = {
              '.html': 'text/html; charset=utf-8',
              '.js': 'application/javascript; charset=utf-8',
              '.css': 'text/css; charset=utf-8',
              '.json': 'application/json; charset=utf-8',
              '.png': 'image/png',
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.svg': 'image/svg+xml',
              '.ico': 'image/x-icon',
              '.woff2': 'font/woff2'
            };
            const contentType = map[ext] || 'application/octet-stream';
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
          } catch (e) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not found');
          }
        })();
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server error');
      }
    };

    const server = http.createServer(serve);
    await new Promise((resolve) => server.listen(5000, resolve));

    // Use Playwright to visit routes and capture rendered HTML
    console.log('3) Launching browser (Playwright)');
    const { chromium } = require('playwright');
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Configure routes to export (adjust or extend if your app has other routes)
    const routes = [
      '/',
      '/checkout',
      '/community-forum',
      '/diagnosis-result',
      '/growth-tracker',
      '/login',
      '/plant-scan',
      '/profile',
      '/reminders',
      '/signup'
    ];

    for (const route of routes) {
      const url = `http://localhost:5000${route}`;
      console.log(`-> Visiting ${url}`);
      await page.goto(url, { waitUntil: 'networkidle' });

      // Wait a short time for any client-side rendering (adjust if your pages fetch data)
      await page.waitForTimeout(300);

      // Get the full HTML after scripts have run
      const content = await page.content();

      // Determine output path in dist. For `/` we keep dist/index.html (already exists). For others create folder and write index.html
      if (route === '/' || route === '') {
        // Optionally overwrite dist/index.html with prerendered HTML to improve first paint
        const outPath = path.join(distDir, 'index.html');
        await fs.writeFile(outPath, content, 'utf8');
        console.log(`  -> Wrote ${path.relative(projectRoot, outPath)}`);
      } else {
        const routePath = route.replace(/(^\/|\/$)/g, ''); // remove leading/trailing slash
        const outDir = path.join(distDir, routePath);
        await fs.mkdir(outDir, { recursive: true });
        const outPath = path.join(outDir, 'index.html');
        await fs.writeFile(outPath, content, 'utf8');
        console.log(`  -> Wrote ${path.relative(projectRoot, outPath)}`);
      }
    }

    await browser.close();
    server.close();
    console.log('Export complete. Files written into dist/. You can serve dist/ (e.g., with a static server)');
  } catch (err) {
    console.error('Export failed:', err);
    process.exitCode = 1;
  }
})();
