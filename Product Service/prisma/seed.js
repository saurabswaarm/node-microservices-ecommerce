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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const data_json_1 = __importDefault(require("./data.json"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.product.deleteMany();
        yield prisma.category.deleteMany();
        const category1 = yield prisma.category.create({
            data: {
                name: "Electronics",
            },
        });
        const category2 = yield prisma.category.create({
            data: {
                name: "Books",
            },
        });
        for (const product of data_json_1.default.products) {
            yield prisma.product.create({
                data: {
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    categoryId: product.category === "Electronics" ? category1.id : category2.id
                },
            });
        }
    });
}
let products = main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
