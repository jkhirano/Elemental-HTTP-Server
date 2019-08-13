"use strict";

const http = require("http");
const fs = require("fs");
const querystring = require("querystring");
const temp = require("./temp.js");
const PORT = 8080;

const server = http.createServer((req, res) => {
  req.setEncoding("utf8");
  console.log(req);

  console.log(req.method);
  console.log(req.url);
  console.log(req.headers);

  // body???
  // this is pulling chunks of data and adding onto the string
  let body = "";
  req.on("data", chunk => {
    body += chunk;
  });

  // Get Method
  // Once chunks are done loading, get file
  req.on("end", () => {
    if (req.method === "GET") {
      if (req.url === "/index.html") {
        fs.readFile("./public/index.html", (err, data) => {
          if (err) throw err;
          // Need to return 404 somewhere else
          console.log(data);
          // Write head
          res.writeHead(200, {
            "content-type": "text/html",
            "content-length": data.length
          });
          // Write body
          res.write(data);
          res.end();
        });
      } else if (req.url === "/helium.html") {
        fs.readFile("./public/helium.html", (err, data) => {
          if (err) throw err;
          res.writeHead(200, {
            "content-type": "text/html",
            "content-length": data.length
          });
          res.write(data);
          res.end();
        });
      } else if (req.url === "/hydrogen.html") {
        fs.readFile("./public/hydrogen.html", (err, data) => {
          if (err) throw err;
          res.writeHead(200, {
            "content-type": "text/html",
            "content-length": data.length
          });
          res.write(data);
          res.end();
        });
      } else if (req.url === "/404.html") {
        fs.readFile("./public/404.html", (err, data) => {
          if (err) throw err;
          res.writeHead(200, {
            "content-type": "text/html",
            "content-length": data.length
          });
          res.write(data);
          res.end();
        });
      }
    }
  });
  // Post Method
  if (req.method === "POST") {
    req.on("data", chunk => {
      const tempHolder = querystring.parse(chunk);
      req.on("end", () => {
        console.log(tempHolder);
        fs.writeFile(`./public${req.url}.html`, temp(tempHolder), err => {
          if (err) throw err;
          console.log("The file has been saved.");
        });
        res.write("SUCCESS");
        res.end();
      });
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});

// req.on("end", () => {
//   // figure out newElement.html string data
//   // using the contents of the request

//   // write the newElement.html file
//   fs.writeFile("./newElement.html", (err, data) => {
//     if (err) {
//       return console.log(err);
//     }

//     // read contents of the public dir
//     fs.readdir("./", (err, dir) => {
//       if (err) {
//         return console.log(err);
//       }

//       // figure out new index.html
//       const index = "<html></html>";

//       // write new index.html
//       fs.writeFile("./index.html", index, err => {
//         if (err) {
//           return console.log(err);
//         }

//         res.end();
//       });
//     });
//   });
// });

// fs.readFile('./test.txt', (err, data) => {
//   if (err) {
//     return console.log('could not write the file');
//   }
//   console.log(data);
// });
