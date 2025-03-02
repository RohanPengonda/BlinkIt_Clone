import Router from 'express'
import { addToCartItemController } from '../controllers/cart.controller.js'
import auth from '../middleware/auth.js'

const cartRouter = Router()

cartRouter.post('/create', auth, addToCartItemController)

export default cartRouter