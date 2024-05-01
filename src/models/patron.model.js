import mongoose from 'mongoose'

const patronSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    stock: { type: Number, required: true, default: 0, min: 0 },
  },
  { timestamps: true }
)
