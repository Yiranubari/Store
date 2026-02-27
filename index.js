const fs = require("fs");
const http = require("http");
const url = require("url");

const json = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const laptopData = JSON.parse(json);

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true);
  console.log(query);

  res.writeHead(200, { "Content-type": "text/html" });
  res.end("This is the response from the server");
});

server.listen(1337, "127.0.0.1", () => {
  console.log("server is listening on port 1337");
});
