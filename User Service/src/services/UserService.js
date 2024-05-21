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
exports.UserService = void 0;
const client_1 = require("@prisma/client");
const CustomError_1 = require("../../../Common/CustomError");
class UserService {
    constructor() {
        let prisma = new client_1.PrismaClient();
        this.prismaModel = prisma.user;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaModel.findMany();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaModel.findUnique({
                where: {
                    id: parseInt(id)
                }
            });
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.email || !data.password || !data.name) {
                throw new CustomError_1.CustomError("Email, password and name are required", 400);
            }
            const user = yield this.prismaModel.findFirst({
                where: {
                    OR: [
                        { phone: data.phone },
                        { email: data.email }
                    ]
                }
            });
            if (user) {
                if (user.phone === data.phone && user.email === data.email) {
                    throw new CustomError_1.CustomError("User with the phone and email already exists", 409);
                }
                else if (user.phone === data.phone) {
                    throw new CustomError_1.CustomError("User with the phone already exists", 409);
                }
                else if (user.email === data.email) {
                    throw new CustomError_1.CustomError("User with the email already exists", 409);
                }
            }
            const hashedPassword = yield bcrypt.hash(data.password, 10);
            return this.prismaModel.create({
                data
            });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaModel.update({
                where: {
                    id: parseInt(id)
                },
                data
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaModel.delete({
                where: {
                    id: parseInt(id)
                }
            });
        });
    }
}
exports.UserService = UserService;
// The user service basically needs to handle two primary things, creating a user after checking if the user already exists.
// The user service will also need to handle the login functionality, where the user will provide their email and password.
