"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const bcrypt = __importStar(require("bcrypt"));
const AccountController = {
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, phone, password } = req.body;
        try {
            const [isEmailExist] = yield models_1.Account.find({ email: email });
            const saltRound = 10;
            bcrypt.hash(password, saltRound, (_err, hashPassword) => {
                const register = new models_1.Account({
                    name,
                    email,
                    phone,
                    password: hashPassword,
                });
                if (isEmailExist) {
                    res.status(400).json({
                        message: `Email already exist.`,
                    });
                    return;
                }
                else {
                    if (register) {
                        res.status(200).json({
                            message: "Account Successfully Saved.",
                        });
                        return register.save();
                    }
                    res.status(400).json({
                        message: `An Error Occured on saving data.`,
                    });
                }
            });
        }
        catch (e) {
            console.log(`Error`, e);
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        let data = "";
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            const [findAccountByPhone] = yield models_1.Account.find({ phone: email });
            if (!findAccountByPhone) {
                res.status(400).json({
                    message: `Phone number does'nt found.`,
                });
                return;
            }
            data = findAccountByPhone;
        }
        else {
            const [findAccountByEmail] = yield models_1.Account.find({ email: email });
            if (!findAccountByEmail) {
                res.status(400).json({
                    message: `Email address does'nt found.`,
                });
                return;
            }
            data = findAccountByEmail;
        }
        if (data) {
            const { password: dbPassword } = data;
            bcrypt.compare(password, dbPassword, (_err, isMatch) => {
                if (!isMatch) {
                    res.status(400).json({
                        message: `Password does'nt match`,
                    });
                    data = "";
                    return;
                }
                res.status(200).json({
                    message: "Successfully Logged In",
                });
            });
        }
    }),
    tailNumber: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            country: {
                id: "Bahamas",
                label: "Bahamas",
                value: {
                    country: "Bahamas",
                },
            },
            prefix: "",
            tail_number: "123541",
        };
        return yield res.send(data);
    }),
};
exports.default = AccountController;
