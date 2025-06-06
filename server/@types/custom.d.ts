import { Request } from "express";
import {IUser} from "../models/user.model";
declare global{
    namespace Express{
        interface Request{
            user?:IUser
        }
    }
} 
/*
This global declaration extends Express's `Request` interface by adding an optional `user` property of type `IUser`. It allows TypeScript to recognize `req.user` in your middleware and routes without errors. This is essential for handling authenticated user data safely in a TypeScript-based Express app.
*/