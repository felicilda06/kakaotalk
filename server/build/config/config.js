"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require(`dotenv`).config();
const { CONN_STRING } = process.env;
const MONGO_CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
exports.config = {
    conn_string: CONN_STRING,
    configurations: MONGO_CONFIG
};
