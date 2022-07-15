"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mainRoute = express_1.default.Router();
mainRoute.get('/', (_req, res) => {
    res.send(`Welcome to Kakaotalk Backend`);
});
exports.default = mainRoute;
