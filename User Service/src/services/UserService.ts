import {Prisma, PrismaClient, User} from "@prisma/client";
import {CustomError} from "../../../Common/CustomError";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

type UserModel = Prisma.UserDelegate

export class UserService {
    private userModel: UserModel;

    constructor() {
        let prisma = new PrismaClient();
        this.userModel = prisma.user;
    }

    async getAll() {
        return this.userModel.findMany();
    }

    async getById(id:string): Promise<User>{
        const user = await this.userModel.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if(!user){
            throw new CustomError("No such user exists", 404, "User not found");
        }

        return user;
    }

    async findAndValidateUser(data:Pick<User, 'email'| 'password'>): Promise<string>{

        const user = await this.userModel.findUnique({
            where: {
                email: data.email
            }
        });

        if(!user) {
            throw new CustomError("User not found", 401);
        }

        // check if password is correct
        const passwordMatch = await bcrypt.compare(data.password, user.password);

        if(!passwordMatch) {
            throw new CustomError("Invalid password", 401);
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET || 'secret', {expiresIn: '1h'});

        return token;


    }

    async create(data:User): Promise<User> {

        if(!data.email || !data.password || !data.name) {
            throw new CustomError("Email, password and name are required", 400);
        }

        const user = await this.userModel.findFirst({
            where: {
                OR: [
                    {phone: data.phone},
                    {email: data.email}
                ]
            }
        });

        if(user) {
            if(user.phone === data.phone && user.email === data.email) {
                throw new CustomError("User with the phone and email already exists", 409);
            } else if(user.phone === data.phone) {
                throw new CustomError("User with the phone already exists", 409);
            } else if(user.email === data.email) {
                throw new CustomError("User with the email already exists", 409);
            }
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        return this.userModel.create({
            data: {
                ...data,
                password: hashedPassword
            }
        });
    }

    async update(id:string, data:User): Promise<User> {
        return this.userModel.update({
            where: {
                id: parseInt(id)
            },
            data
        });
    }

    async delete(id:string): Promise<User>{
        return this.userModel.delete({
            where: {
                id: parseInt(id)
            }
        });
    }
}


// The user service basically needs to handle two primary things, creating a user after checking if the user already exists.
// The user service will also need to handle the login functionality, where the user will provide their email and password.