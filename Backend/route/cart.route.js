import Router from 'express'
import { addToCartItemController, getCartItemController } from '../controllers/cart.controller.js'
import auth from '../middleware/auth.js'

const cartRouter = Router()

cartRouter.post('/create', auth, addToCartItemController)
cartRouter.get('/get', auth, getCartItemController)

export default cartRouter