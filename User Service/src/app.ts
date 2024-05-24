import express , { Express, Request, Response} from 'express';
import { AuthController } from './controllers/AuthController';
import {errorHandler} from "./controllers/ErrorHandler";
import {UserController} from "./controllers/UserController";
const app:Express = express();
app.use(express.json())

const PORT = process.env.PORT || 3012;

app.get('/', (req:Request, res:Response) => {
    res.send('Hello World');
})

const authController = new AuthController();
app.use('/auth', authController.router);

const userController = new UserController();
app.use('/user', userController.router);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})
