import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: [true, 'Email is required'] },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [8, 'Password must be at least 8 characters long'],
    },
  },
  { timestamps: true }
)

const Admin = mongoose.model('Admin', adminSchema)

export default Admin
