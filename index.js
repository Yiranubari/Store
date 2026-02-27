const fs = require("fs");
const http = require("http");
const json = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const laptopData = JSON.parse(json);

const server = http.createServer((req, res) => {
  console.log("someone has made a request from the browser");
});

server.listen(1337, "127.0.0.1", () => {
  console.log("server is listening on port 1337");
});
