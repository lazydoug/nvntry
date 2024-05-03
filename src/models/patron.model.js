import mongoose from 'mongoose'

const patronSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    product: {
      type: String,
      required: [true, 'Product is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Inventory level is required'],
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
)

const Patron = mongoose.model('Patron', patronSchema)

export default Patron
