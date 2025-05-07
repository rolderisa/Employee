import { hashSync } from "bcrypt";
import { config } from "dotenv";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import prisma from "../prisma/prisama-client";
import ServerResponse from "../utils/ServerResponse";

config()

const createUser = async (req: Request, res: Response) => {
    try {
        const { email, names, password } = req.body
        const hashedPassword = hashSync(password, 10)
        const user = await prisma.user.create({
            data: {
                email,
                names,
                role: "ADMIN",
                password: hashedPassword
            }
        })
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '3d' })
        return ServerResponse.created(res, "User created successfully", { user, token })
    } catch (error: any) {
        if (error.code === 'P2002') {
            const key = error.meta.target[0]
            return ServerResponse.error(res, `${key.charAt(0).toUpperCase() + key.slice(1)} (${req.body[key]}) already exists`, 400);
        }
        return ServerResponse.error(res, "Error occured", { error })
    }
}


const userController = {
    createUser
}

export default userController;