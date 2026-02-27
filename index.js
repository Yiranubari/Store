const fs = require("fs");
const http = require("http");
const url = require("url");

const json = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const laptopData = JSON.parse(json);

const server = http.createServer((req, res) => {
  const pathName = url.parse(req.url, true).pathname;
  const query = url.parse(req.url, true).query;

  console.log(url.parse(req.url, true));

  if (pathName === "/products" || pathName === "/") {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end("this is the products page");
  } else if (pathName === "/laptop" && query.id < laptopData.length) {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end("this is the laptop page");
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end("page not found");
  }
});

server.listen(1337, "127.0.0.1", () => {
  console.log("server is listening on port 1337");
});
