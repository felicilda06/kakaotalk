"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const Chat = ({ socket }) => {
    if (socket) {
        socket.emit("me", socket.id);
        socket.emit("chat", "zupp", (res) => {
            console.log(res);
        });
        socket.on("received", (res) => {
            console.log(`response`, res);
        });
    }
    return socket;
};
exports.Chat = Chat;
