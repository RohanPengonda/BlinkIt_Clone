import AddressModel from '../models/address.model.js'
import UserModel from '../models/user.model.js'

export const addAddressController = async (request, response) => {
  try {
    const userId = request.userId //middleware
    const { address_line, city, state, pincode, country, mobile } = request.body

    const createAddress = new AddressModel({
      address_line,
      city,
      state,
      pincode,
      country,
      mobile
    })

    const saveAddress = await createAddress.save()

    const addUserAddressId = await UserModel.findByIdAndUpdate(userId, {
      $push: {
        address_details: saveAddress._id
      }
    })

    return response.json({
      message: "Address Created Successfully",
      error: false,
      success: true,
      data: saveAddress
    })

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })

  }
}