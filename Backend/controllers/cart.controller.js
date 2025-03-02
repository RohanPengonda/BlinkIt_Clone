import CartProductModel from '../models/cartproduct.model.js'
import UserModel from '../models/user.model.js'

export const addToCartItemController = async (request, response) => {
  try {
    const userId = request.userId
    const { productId } = request.body
    if (!productId) {
      return response.status(402).json({
        message: "Provide Product ID",
        error: true,
        success: false
      })
    }

    const checkItemCart = await CartProductModel.findOne({
      userId: userId,
      productId: productId,
    })

    if (checkItemCart) {
      return response.status(400).json({
        message: "Item already in Cart"
      })
    }

    const cartItem = new CartProductModel({
      quantity: 1,
      userId: userId,
      productId: productId,
    })

    const save = await cartItem.save()

    const updateCartUser = await UserModel.findOne({ _id: userId }, {
      $push: {
        shopping_cart: productId,
      }
    })

    return response.json({
      data: save,
      message: "Items Added Successfully ",
      error: false,
      success: true
    })

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}