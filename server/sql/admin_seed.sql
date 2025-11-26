-- Admin seed: creates admin@docplant.com if it does not exist
USE docplant;

-- Replace @admin_hash with a real bcrypt hash string
-- Generate one via:
--   cd "e:\Source Codes\Docplantwebsite\server"
--   node -e "console.log(require('bcryptjs').hashSync('Admin123!', 10))"
-- Then paste the printed hash into @admin_hash below.

SET @admin_email := 'admin@docplant.com';
SET @admin_name := 'Admin';
SET @admin_hash := '$2a$10$Y.S.H3zGMjcNrDcXw7qzSOn0rZS0G0bwNgbFQ7mIG2soJUfq9lnoa';

INSERT INTO users (email, password_hash, name)
SELECT @admin_email, @admin_hash, @admin_name
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = @admin_email);
