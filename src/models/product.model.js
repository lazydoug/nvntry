import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    unit_price: { type: Number, required: true },
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

export default Product
