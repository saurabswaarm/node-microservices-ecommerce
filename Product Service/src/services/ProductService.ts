import {Prisma, PrismaClient, Product} from "@prisma/client";

type PrismaModel = Prisma.ProductDelegate;

export class ProductService {
    private prismaModel: PrismaModel;
    constructor() {
        let prisma = new PrismaClient();
        this.prismaModel = prisma.product;
    }

    async getAll() {
        return this.prismaModel.findMany();
    }

    async getById(id:string): Promise<Product | null>{
        return this.prismaModel.findUnique({
            where: {
                id: parseInt(id)
            }
        });
    }

    async create(data:Product): Promise<Product> {
        return this.prismaModel.create({
            data
        });
    }

    async update(id:string, data:Product): Promise<Product> {
        return this.prismaModel.update({
            where: {
                id: parseInt(id)
            },
            data
        });
    }

    async delete(id:string): Promise<Product>{
        return this.prismaModel.delete({
            where: {
                id: parseInt(id)
            }
        });
    }

}