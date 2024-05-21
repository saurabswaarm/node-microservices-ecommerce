import {Prisma, PrismaClient, Category} from "@prisma/client";

type PrismaModel = Prisma.CategoryDelegate;

export class CategoryService {
    private prismaModel: PrismaModel;

    constructor() {
        let prisma = new PrismaClient();
        this.prismaModel = prisma.category;
    }

    async getAll() {
        return this.prismaModel.findMany();
    }

    async getById(id: string): Promise<Category | null> {
        return this.prismaModel.findUnique({
            where: {
                id: parseInt(id)
            }
        });
    }

    async create(data: Category): Promise<Category> {
        return this.prismaModel.create({
            data
        });
    }

    async update(id: string, data: Category): Promise<Category> {
        return this.prismaModel.update({
            where: {
                id: parseInt(id)
            },
            data
        });
    }

    async delete(id: string): Promise<Category> {
        return this.prismaModel.delete({
            where: {
                id: parseInt(id)
            }
        });
    }

}

