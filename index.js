import http from "http";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  console.log(req.url);
  const requestedFileName = (() => {
    switch (req.url) {
      case "/about":
        return "about.html";
      case "/contact-me":
        return "contact-me.html";
      case "/":
        return "index.html";
      default:
        return "404.html";
    }
  })();
  if (req.rawHeaders.includes("Referer")) {
    res.statusCode = 200;
    res.end();
  } else {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(
      (() => {
        try {
          const data = fs.readFileSync(requestedFileName, "utf8");
          return data;
        } catch (err) {
          return "error";
        }
      })()
    );
  }
});
server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
