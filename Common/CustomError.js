"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, status, name) {
        super(message);
        this.name = name || 'CustomError';
        this.status = status || 500;
    }
}
exports.CustomError = CustomError;
