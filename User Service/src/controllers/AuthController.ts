import { UserService } from "../services/UserService";
import {NextFunction, Request, Response} from "express";
import {Router} from "express";

// user controller class will have two methods register user and login user
export class AuthController {
    private userService: UserService
    public router:Router;

    constructor (){
        this.router = Router();
        this.userService = new UserService();
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.router.post('/register', this.register);
        this.router.post('/login', this.login);
    }

    async register(req:Request, res:Response, next:NextFunction){
        try{
            const result = await this.userService.create(req.body);
            res.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }

    async login(req:Request, res:Response, next:NextFunction){
        try{
            const token = await this.userService.findAndValidateUser(req.body);
            res.setHeader('Authorization', 'Bearer ' + token);
            res.status(201).send({message: "Login successful"});
        } catch (error) {
            next(error);
        }
    }
}


//