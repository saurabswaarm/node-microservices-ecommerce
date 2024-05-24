import {UserService} from "../services/UserService";
import {NextFunction, Request, Response} from "express";
import {Router} from "express";


export class UserController {
    private userService: UserService;
    public router: Router;

    constructor() {
        this.userService = new UserService();
        this.getProfile = this.getProfile.bind(this);
        this.router = Router();
        this.router.get('/profile', this.getProfile);

    }

    async getProfile(req:Request, res: Response, next: NextFunction){
        try{
            // get the id from the query string
            const id = req.user;
            if(id && typeof id === 'string'){
                let user = this.userService.getById(id)
            }
        } catch(error) {
           next(error)
        }

    }
}