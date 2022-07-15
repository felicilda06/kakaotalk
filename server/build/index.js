"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = require("./routes");
const socket_1 = require("./socket/socket");
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const { PORT } = process.env;
const { conn_string, configurations } = config_1.config;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const port = PORT !== null && PORT !== void 0 ? PORT : 8000;
server.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
    mongoose_1.default //@ts-ignore
        .connect(conn_string, configurations)
        .then(() => console.log(`Connected to MongoDb`))
        .catch((err) => console.log(`Error`, err));
    (0, socket_1.Socket)(server);
});
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(routes_1.mainRoute);
app.use(routes_1.AccountRoute);
