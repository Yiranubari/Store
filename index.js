const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(json);

const server = http.createServer((req, res) => {
  const pathName = url.parse(req.url, true).pathname;
  const query = url.parse(req.url, true).query;

  console.log(url.parse(req.url, true));

  if (pathName === '/products' || pathName === '/') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end('this is the products page');
  } else if (pathName === '/laptop' && query.id < laptopData.length) {
    res.writeHead(200, { 'Content-type': 'text/html' });

    fs.readFile(
      `${__dirname}/templates/template-laptop.html`,
      'utf-8',
      (err, data) => {
        const laptop = laptopData[query.id];
        let output = data.replace('{%PRODUCTNAME%}', laptop.productName);
        output = output.replace('{%PRICE%}', laptop.price);
        output = output.replace('{%IMAGE%}', laptop.image);
        output = output.replace('{%SCREEN%}', laptop.screen);
        output = output.replace('{%CPU%}', laptop.cpu);
        output = output.replace('{%STORAGE%}', laptop.storage);
        output = output.replace('{%RAM%}', laptop.ram);
        output = output.replace('{%DESCRIPTION%}', laptop.description);

        res.end(output);
      }
    );
  } else {
    res.writeHead(404, { 'Content-type': 'text/html' });
    res.end('page not found');
  }
});

server.listen(1337, '127.0.0.1', () => {
  console.log('server is listening on port 1337');
});
