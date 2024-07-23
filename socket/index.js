const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5173" });

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  // listen to a connection
  socket.on("addNewUser", (userId) => {
    console.log("User Added", userId);
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    console.log("Online Users", onlineUsers);
    io.emit("getOnlineUsers", onlineUsers);
  });

  // add message
  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find((user) => {
      return user?.userId === message?.recipientId;
    });
    if (user) {
      io.to(user.socketId).emit("getMessage", message);
      io.to(user.socketId).emit("getNotification", {
        recipient: message?.recipientId,
        sender: message?.senderId,
        message: "New Notification",
        createdAt: Date.now(),
      });
    }
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});

io.listen(3000);
