const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');

const port = 8080;

const requestHandler = (request, response) => {
  let filePath = path.join(__dirname, 'public', request.url === '/' ? 'index.html' : request.url);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('Not Found');
      return;
    }

    const ext = path.extname(filePath);
    const contentType = mime.getType(ext) || 'text/html';
    response.writeHead(200, { 'Content-Type': contentType });
    response.end(data);
  });
};

const server = http.createServer(requestHandler);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
