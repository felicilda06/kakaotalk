"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const express_1 = __importDefault(require("express"));
const accountRoute = express_1.default.Router();
const { register, login, tailNumber } = controllers_1.AccountController;
accountRoute.post('/signup', register);
accountRoute.post('/login', login);
accountRoute.get('/tailNumber', tailNumber);
exports.default = accountRoute;
