"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socket = void 0;
const socket_io_1 = require("socket.io");
const Socket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: { origin: "*", methods: ["GET", "POST"] },
    });
    io.on("connection", (socket) => {
        console.log(`New User Connected`);
        socket.emit("user", socket.id);
        socket.on("disconnect", () => console.log(`New User Disconnected`));
    });
};
exports.Socket = Socket;
