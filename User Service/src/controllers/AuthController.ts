import { UserService } from "../services/UserService";
import { Request, Response } from "express";

// user controller class will have two methods register user and login user
export class AuthController {
    private service: UserService

    constructor (){
        this.service = new UserService();
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }

    async register(req:Request, res:Response) {
        const data = req.body;
        const result = await this.service.create(data);
        res.send(result);
    }

    async login(req:Request, res:Response) {
        const data = req.body;
        res.send(result);
    }
}


//