const path = require("path");
const express = require("express");
const app = express();

app.set("port", process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(app.get("port"), () => {
  console.log("server on port: ", app.get("port"));
});

const socketIO = require("socket.io");
const io = socketIO(server);

//websockts
io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  socket.on("chat:message", (data) => {
    io.sockets.emit("chat:message", data);
  });

  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
  });
});

/* const http = require("http").createServer(app);
const io = require("socket.io")(http);

const port = process.env.PORT || 3000;
publicDir = express.static(`${__dirname}/public`);

app.use(publicDir).get("/", (req, res) => {
  res.sendFile(`${publicDir}index.html`);
});

http.listen(port, () => {
  console.log("Iniciando Express y Socket en puerto:", port);
}); */

console.log("Hola Mundo! Me llamo Nelvis");
