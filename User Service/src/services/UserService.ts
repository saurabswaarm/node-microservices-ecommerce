import {Prisma, PrismaClient, User} from "@prisma/client";
import {CustomError} from "../../../Common/CustomError";

type PrismaModel = Prisma.UserDelegate

export class UserService {
    private prismaModel: PrismaModel;

    constructor() {
        let prisma = new PrismaClient();
        this.prismaModel = prisma.user;
    }

    async getAll() {
        return this.prismaModel.findMany();
    }

    async getById(id:string): Promise<User | null>{
        return this.prismaModel.findUnique({
            where: {
                id: parseInt(id)
            }
        });
    }

    async create(data:User): Promise<User> {

        if(!data.email || !data.password || !data.name) {
            throw new CustomError("Email, password and name are required", 400);
        }

        const user = await this.prismaModel.findFirst({
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

        return this.prismaModel.create({
            data
        });
    }

    async update(id:string, data:User): Promise<User> {
        return this.prismaModel.update({
            where: {
                id: parseInt(id)
            },
            data
        });
    }

    async delete(id:string): Promise<User>{
        return this.prismaModel.delete({
            where: {
                id: parseInt(id)
            }
        });
    }
}


// The user service basically needs to handle two primary things, creating a user after checking if the user already exists.
// The user service will also need to handle the login functionality, where the user will provide their email and password.