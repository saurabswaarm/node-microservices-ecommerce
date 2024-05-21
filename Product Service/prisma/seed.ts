import {PrismaClient, Category, Product, Prisma} from "@prisma/client";
import data from './data.json';


const prisma = new PrismaClient();

async function main() {

    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    const category1: Category = await prisma.category.create({
        data: {
            name: "Electronics",
        },
    });

    const category2: Category = await prisma.category.create({
        data: {
            name: "Books",
        },
    });

    for (const product of data.products) {
        await prisma.product.create({
            data: {
                name: product.name,
                description: product.description,
                price: product.price,
                categoryId: product.category === "Electronics" ? category1.id : category2.id
            },
        });
    }
}


let products =
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });