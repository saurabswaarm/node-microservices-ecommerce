import express , { Express, Request, Response} from 'express';
import {categoryRoutes} from "./routes/categoryRoutes";
import {productRoutes} from "./routes/productRoutes";

const app:Express = express();
app.use(express.json())

const PORT = process.env.PORT || 3011;

app.get('/', (req:Request, res:Response) => {
    res.send('Hello World');
})

// set up the routes for products and categories
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);


try {
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    })
} catch (error) {
    console.error(error);
}