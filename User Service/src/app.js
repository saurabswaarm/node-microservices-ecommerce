"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("./controllers/AuthController");
const ErrorHandler_1 = require("./controllers/ErrorHandler");
const UserController_1 = require("./controllers/UserController");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 3012;
app.get('/', (req, res) => {
    res.send('Hello World');
});
const authController = new AuthController_1.AuthController();
app.use('/auth', authController.router);
const userController = new UserController_1.UserController();
app.use('/user', userController.router);
app.use(ErrorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
