import express from 'express'
import { createUser, deleteUser, getAllUser, getUserById, updateUser } from '../controllers/userController.js'
import asyncHandler from '../utils/asyncHandler.js'
import { protect } from '../middlewares/protect.js'
import { authorize } from '../middlewares/authorize.js'


const router = express.Router()


router.post("/",protect, authorize('admin'), asyncHandler(createUser))
router.get("/", asyncHandler(getAllUser))
router.get("/:id", asyncHandler(getUserById))
router.put("/:id",protect, authorize('admin'), asyncHandler(updateUser))
router.delete("/:id",protect, authorize('admin'), asyncHandler(deleteUser))

export default router