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

    fs.readFile(
      `${__dirname}/templates/template-laptop.html`,
      "utf-8",
      (err, data) => {
        let output = data.replace(
          "{%PRODUCTNAME%}",
          laptopData[query.id].productName,
        );
        output = output.replace("{%PRICE%}", laptopData[query.id].price);
        output = output.replace("{%IMAGE%}", laptopData[query.id].image);
        output = output.replace("{%SCREEN%}", laptopData[query.id].screen);
        output = output.replace("{%CPU%}", laptopData[query.id].cpu);
        output = output.replace("{%STORAGE%}", laptopData[query.id].storage);
        output = output.replace("{%RAM%}", laptopData[query.id].ram);
        output = output.replace(
          "{%DESCRIPTION%}",
          laptopData[query.id].description,
        );

        res.end(output);
      },
    );
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end("page not found");
  }
});

server.listen(1337, "127.0.0.1", () => {
  console.log("server is listening on port 1337");
});
