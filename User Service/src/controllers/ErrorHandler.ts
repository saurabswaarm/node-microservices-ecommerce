import {Request, Response, NextFunction} from "express";
import { CustomError } from "../../../Common/CustomError"

export function errorHandler(err: CustomError, req: Request, res: Response, next: NextFunction) {
    res.status(err.status).send({ error: err.message });
}
