const WebSocketServer = require("websocket").server;
const http = require("http");

const server = http.createServer((req, res) => {});
server.listen(1337, () => console.log("listening"));

const colors = ["red", "green"];
let clients = [];

socketServer = new WebSocketServer({
  httpServer: server
});

socketServer.on("request", req => {
  const connection = req.accept(null, req.origin);
  console.log(`connection from ${req.origin}`);
  clients.push(connection);
  connection.on("message", message => {
    if (message.type === "utf8") {
      console.log(message);
      clients.map(x =>
        x.sendUTF(JSON.stringify({ type: "message", text: message.utf8Data }))
      );
    }
  });

  connection.on("close", connection => {
    // close connection
  });
});
