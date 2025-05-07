import { Router } from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import employeeRouter from "./employee.route";

const router = Router()

router.use("/auth", authRouter
    /*
        #swagger.tags = ['Auth']
        #swagger.security = [{
                "bearerAuth": []
        }] 
    */
)
router.use("/user", userRouter
    /*
        #swagger.tags = ['Users']
        #swagger.security = [{
                "bearerAuth": []
        }] 
    */
)
router.use("/employee", employeeRouter
    /*
        #swagger.tags = ['Employees']
        #swagger.security = [{
                "bearerAuth": []
        }] 
    */
)
export default router