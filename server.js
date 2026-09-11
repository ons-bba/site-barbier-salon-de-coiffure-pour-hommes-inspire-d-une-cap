// Serveur statique minimal — généré par TaskWizia.
// Sert index.html (et les fichiers du dépôt) sur le port fourni par l'hébergeur.
const http = require("http");
const fs = require("fs");
const path = require("path");

const racine = __dirname;
const port = Number(process.env.PORT) || 3000;
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".txt": "text/plain; charset=utf-8", ".json": "application/json" };

http
  .createServer((req, res) => {
    const url = decodeURIComponent((req.url || "/").split("?")[0]);
    let fichier = path.normalize(path.join(racine, url === "/" ? "index.html" : url));
    if (!fichier.startsWith(racine)) fichier = path.join(racine, "index.html");
    fs.stat(fichier, (err, stat) => {
      if (err || !stat.isFile()) fichier = path.join(racine, "index.html");
      const type = types[path.extname(fichier).toLowerCase()] || "application/octet-stream";
      res.writeHead(200, { "Content-Type": type, "Cache-Control": "public, max-age=300" });
      fs.createReadStream(fichier).pipe(res);
    });
  })
  .listen(port, () => console.log("Site en ligne sur le port " + port));
