import { ProductService} from "../services/ProductService";
import {Request, Response} from "express";

export class ProductController {
    private service: ProductService

    constructor (){
        this.service = new ProductService();
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async getAll(req:Request, res:Response) {
        const result = await this.service.getAll();
        res.send(result);
    }

    async getById(req:Request, res:Response) {
        const id = req.params.id;
        const result = await this.service.getById(id);
        res.send(result);
    }

    async create(req:Request, res:Response) {
        const data = req.body;
        const result = await this.service.create(data);
        res.send(result);
    }

    async update(req:Request, res:Response) {
        const id = req.params.id;
        const data = req.body;
        const result = await this.service.update(id, data);
        res.send(result);
    }

    async delete(req:Request, res:Response) {
        const id = req.params.id;
        const result = await this.service.delete(id);
        res.send(result);
    }

}