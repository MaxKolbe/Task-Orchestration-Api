import express from "express"
import {
    initializationController, 
    verificationController
} from "./payment.controller.js"
const router = express.Router()

router.post("/", initializationController)
router.get("/", verificationController)

export default router