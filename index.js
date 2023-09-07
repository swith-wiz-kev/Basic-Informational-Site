import http from "http";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  console.log(req.url);

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(
    (() => {
      try {
        const data = fs.readFileSync("index.html", "utf8");
        return data;
      } catch (err) {
        return "error";
      }
    })()
    /* 
    fs.readFileSync("index.html", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      } else {
        return data;
      }
    }) */
  );
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
