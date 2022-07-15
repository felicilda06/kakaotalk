import { Server } from "socket.io";

export const Socket = (server: any) => {
  const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    console.log(`New User Connected`);
    socket.emit("user", socket.id);

    socket.on("disconnect", () => console.log(`New User Disconnected`));
  });
};

