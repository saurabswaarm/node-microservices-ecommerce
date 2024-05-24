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
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
const express_1 = require("express");
class UserController {
    constructor() {
        this.userService = new UserService_1.UserService();
        this.getProfile = this.getProfile.bind(this);
        this.router = (0, express_1.Router)();
        this.router.get('/profile', this.getProfile);
    }
    getProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get the id from the query string
                const id = req.user;
                if (id && typeof id === 'string') {
                    let user = this.userService.getById(id);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
