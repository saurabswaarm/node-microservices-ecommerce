"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryRoutes_1 = require("./routes/categoryRoutes");
const productRoutes_1 = require("./routes/productRoutes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 3011;
app.get('/', (req, res) => {
    res.send('Hello World');
});
// set up the routes for products and categories
app.use('/products', productRoutes_1.productRoutes);
app.use('/categories', categoryRoutes_1.categoryRoutes);
try {
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    });
}
catch (error) {
    console.error(error);
}
