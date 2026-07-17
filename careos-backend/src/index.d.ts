import { IRequestUser } from "./app/interfaces/requestUser.interface.js";

declare global {
    namespace Express {
        interface Request {
            user?: IRequestUser;
            file?: Express.Multer.File;
            files?: {
                [fieldname: string]: Express.Multer.File[];
            } | Express.Multer.File[];
        }
    }
}