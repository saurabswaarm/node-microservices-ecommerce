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
// user controller class will have two methods register user and login user
class AuthController {
    constructor() {
        this.service = new UserService_1.UserService();
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const result = yield this.service.create(data);
            res.send(result);
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            res.send(result);
        });
    }
}
exports.AuthController = AuthController;
//
