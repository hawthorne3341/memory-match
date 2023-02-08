import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import MemoryMatch from "../MemoryMatch";

const server = express();
server.use(express.static("dist"));

server.get("/", (req, res) => {
  const initialMarkup = ReactDOMServer.renderToStaticMarkup(<MemoryMatch />);

  res.send(`
    <html>
      <head>
        <title>@realMemoryMatch</title>
      </head>
      <body>
        <div id="mountNode">${initialMarkup}</div>
        <script src="/main.js"></script>
      </body>
    </html>
  `);
});

server.listen(7523, () => console.log("Server is running on port 7523"));
