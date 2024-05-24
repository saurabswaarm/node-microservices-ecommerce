import jwt ,{JwtPayload} from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: string | JwtPayload
        }
    }
}

const authorize = (req:Request, res:Response, next:NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send({ message: 'No token provided' });
    }

    try {
        const decoded= jwt.verify(token, process.env.JWT_SECRET || 'secret' as string) as JwtPayload;
        req.user = decoded.id;
        next();
    } catch (err) {
        return res.status(401).send({ message: 'Invalid token' });
    }
};