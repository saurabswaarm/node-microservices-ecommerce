
export interface PrismaModel<T> {
    findMany(): Promise<T[]>;
    findUnique(args:any): Promise<T | null>;
    create(args:any): Promise<T>;
    update(args:any): Promise<T>;
    delete(args:any): Promise<T>;
}

export class BaseService<T> {
    private prismaModel: PrismaModel<T>;
    constructor(model:PrismaModel<T>) {
        this.prismaModel = model;
    }

    async getAll() {
        return this.prismaModel.findMany();
    }

    async getById(id:string): Promise<T | null>{
        return this.prismaModel.findUnique({
            where: {
                id: parseInt(id)
            }
        });
    }

    async create(data:T): Promise<T> {
        return this.prismaModel.create({
            data
        });
    }

    async update(id:string, data:T): Promise<T> {
        return this.prismaModel.update({
            where: {
                id: parseInt(id)
            },
            data
        });
    }

    async delete(id:string): Promise<T>{
        return this.prismaModel.delete({
            where: {
                id: parseInt(id)
            }
        });
    }

}