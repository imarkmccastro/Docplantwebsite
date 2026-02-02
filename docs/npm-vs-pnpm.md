# npm vs pnpm (Quick Comparison)

## Overview
- **npm**: Default package manager shipped with Node.js. Uses a flat `node_modules` layout and npm lockfiles.
- **pnpm**: Fast, space‑efficient package manager that uses a content‑addressable store and a non‑flat `node_modules` structure with symlinks/hardlinks.

## Key Differences
### Installation Model
- **npm**: Copies full package trees into each project’s `node_modules`.
- **pnpm**: Stores packages once and links them into projects, reducing disk usage.

### Performance
- **npm**: Good baseline speed.
- **pnpm**: Typically faster installs and smaller disk footprint due to shared store.

### Disk Usage
- **npm**: Higher disk usage with duplicate package copies across projects.
- **pnpm**: Lower disk usage with a shared global store.

### Dependency Strictness
- **npm**: Flat tree can allow undeclared dependencies to be resolved implicitly.
- **pnpm**: Strict node_modules structure prevents implicit dependency access, catching missing deps earlier.

### Lockfiles
- **npm**: `package-lock.json`.
- **pnpm**: `pnpm-lock.yaml`.

### Workspaces
- **npm**: Supports workspaces, but requires newer npm versions.
- **pnpm**: First‑class, fast workspaces with `pnpm-workspace.yaml`.

## Common Commands
| Task | npm | pnpm |
|------|-----|------|
| Install | `npm install` | `pnpm install` |
| Add dependency | `npm install <pkg>` | `pnpm add <pkg>` |
| Add dev dependency | `npm install -D <pkg>` | `pnpm add -D <pkg>` |
| Run script | `npm run <script>` | `pnpm <script>` |
| Global install | `npm install -g <pkg>` | `pnpm add -g <pkg>` |

## When to Use Which
- **npm**: Simplicity, default tooling, broad compatibility.
- **pnpm**: Faster installs, better disk usage, stricter dependency isolation, strong workspace support.
