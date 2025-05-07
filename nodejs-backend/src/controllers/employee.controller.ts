import { Request, Response } from "express";
import prisma from "../prisma/prisama-client";
import { AuthRequest } from "../types";
import ServerResponse from "../utils/ServerResponse";
import { paginator } from "../utils/paginator";

const createEmployee: any = async (req: AuthRequest, res: Response) => {
    try {
        const { firstName, lastName, email, nationalId, telephone, department, position, laptopManufacturer, model, serialNumber } = req.body
        const employee = await prisma.employee.create({
            data: {
                firstName, lastName, email, nationalId, telephone, department, position, laptopManufacturer, model, serialNumber,
                createdBy: {
                    connect: {
                        id: req.user.id
                    }
                }
            }
        })
        return ServerResponse.created(res, "Employee created successfully", { employee })
    } catch (error: any) {
        if (error.code === 'P2002') {
            const key = error.meta.target[0]
            return ServerResponse.error(res, `${key.charAt(0).toUpperCase() + key.slice(1)} (${req.body[key]}) already exists`, 400);
        }
        console.log(error)
        return ServerResponse.error(res, "Error occured", { error })
    }
}

const getEmployees = async (req: Request, res: Response) => {
    try {
        const { page, limit } = req.query;
        const employees = await prisma.employee.findMany({
            skip: page ? parseInt(page as string) - 1 : 0,
            take: limit ? Number(limit) : 10
        })
        const total = await prisma.employee.count({});
        return ServerResponse.success(res, "Employees fetched successfully", { employees, meta: paginator({ page: page ? Number(page) : 1, limit: limit ? Number(limit) : 10, total }) })
    } catch (error: any) {
        return ServerResponse.error(res, "Error fetching employees")
    }
}

const employeeController = {
    createEmployee,
    getEmployees
}

export default employeeController