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
exports.CategoryController = void 0;
const CategoryService_1 = require("../services/CategoryService");
class CategoryController {
    constructor() {
        this.service = new CategoryService_1.CategoryService();
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.getAll();
            res.send(result);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const result = yield this.service.getById(id);
            res.send(result);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const result = yield this.service.create(data);
            res.send(result);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = req.body;
            const result = yield this.service.update(id, data);
            res.send(result);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const result = yield this.service.delete(id);
            res.send(result);
        });
    }
    routes() {
        return {
            getAll: this.getAll.bind(this),
            getById: this.getById.bind(this),
            create: this.create.bind(this),
            update: this.update.bind(this),
            delete: this.delete.bind(this)
        };
    }
}
exports.CategoryController = CategoryController;
