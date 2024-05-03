import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Product name is required'] },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be less than zero'],
    },
    unit_price: { type: Number, required: [true, 'Unit price is required'] },
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

export default Product
