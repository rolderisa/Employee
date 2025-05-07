import { Router } from "express";
import { checkAdmin } from "../middlewares/auth.middleware";
import employeeController from "../controllers/employee.controller";
import { validationMiddleware } from "../middlewares/validator.middleware";
import { CreateEmployeeDTO } from "../dtos/employee.dto";

const employeeRouter = Router();

employeeRouter.get("/all", [checkAdmin], employeeController.getEmployees)
employeeRouter.post("/create", [checkAdmin, validationMiddleware(CreateEmployeeDTO)], employeeController.createEmployee)

export default employeeRouter;