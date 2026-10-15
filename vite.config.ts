import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-static-subprojects',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (!req.url) return next();
          const cleanUrl = req.url.split('?')[0];

          if (cleanUrl.startsWith('/jardim-web') || cleanUrl.startsWith('/nfse-nacional')) {
            let relativePath = cleanUrl.replace(/^\//, '');
            let filePath = path.resolve(process.cwd(), relativePath);

            if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
              filePath = path.join(filePath, 'index.html');
            }

            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              const ext = path.extname(filePath).toLowerCase();
              const mimeMap: Record<string, string> = {
                '.html': 'text/html; charset=utf-8',
                '.css': 'text/css; charset=utf-8',
                '.js': 'application/javascript; charset=utf-8',
                '.json': 'application/json; charset=utf-8',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.svg': 'image/svg+xml',
                '.ico': 'image/x-icon',
                '.woff': 'font/woff',
                '.woff2': 'font/woff2',
                '.ttf': 'font/ttf',
              };
              res.setHeader('Content-Type', mimeMap[ext] || 'application/octet-stream');
              return fs.createReadStream(filePath).pipe(res);
            }
          }
          next();
        });
      },
    },
  ],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
