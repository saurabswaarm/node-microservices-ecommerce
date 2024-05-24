"use strict";
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
exports.AuthController = void 0;
const UserService_1 = require("../services/UserService");
const express_1 = require("express");
// user controller class will have two methods register user and login user
class AuthController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.userService = new UserService_1.UserService();
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.router.post('/register', this.register);
        this.router.post('/login', this.login);
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userService.create(req.body);
                res.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield this.userService.findAndValidateUser(req.body);
                res.setHeader('Authorization', 'Bearer ' + token);
                res.status(201).send({ message: "Login successful" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.AuthController = AuthController;
//
