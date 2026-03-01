import express from 'express'
import { createPoem, updatePoem, deletePoem, getAllPoems, getPoemById } from '../controllers/poemController.js'
import { protect} from '../middlewares/protect.js'
import {authorize} from '../middlewares/authorize.js'
import asyncHandler from '../utils/asyncHandler.js'
import { poemCreateValidation, poemUpdateValidation } from '../middlewares/validators/poemValidation.js'

const router = express.Router()

router.post('/', protect, poemCreateValidation, asyncHandler(createPoem))
router.get('/', asyncHandler(getAllPoems))
router.get('/:id', asyncHandler(getPoemById))
router.put('/:id',protect, poemUpdateValidation, asyncHandler(updatePoem))
router.delete('/:id',protect, asyncHandler(deletePoem))
router.get('/admin/all', protect, authorize('admin'), asyncHandler(getAllPoems))


export default router