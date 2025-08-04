import { Server as SocketIOServer } from "socket.io";
import http from "http";

export const initSocketServer = (server: http.Server) => {
  const io = new SocketIOServer(server);
  io.on("connection", (socket) => {
    console.log("User Connected!");
    //Listen for Notification Event from the Server
    socket.on("notification", (data) => {
      //Bradcast the notification data to the all connected clients(admin dashboard)
      //socket.broadcast.emit() ---> m-op
      io.emit("newNotification", data);
    });
    socket.on("disconnect", () => {
      console.log("User Disconnected!");
    });
  });
};
