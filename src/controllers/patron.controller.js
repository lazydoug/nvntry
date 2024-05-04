import { config } from 'dotenv'
import { compare, hash } from 'bcrypt'
import jwt from 'jsonwebtoken'

import Patron from '../models/patron.model.js '

config()

const login = async (req, res) => {
  const {
    body: { name, password },
  } = req

  try {
    const patron = await Patron.findOne({ name })

    if (!patron)
      return res.status(401).send({ message: 'Incorrect name or password' })

    const isValid = await compare(password, patron.password)

    if (!isValid)
      return res.status(401).send({ message: 'Incorrect name or password' })

    const token = jwt.sign({ name }, process.env.SECRET_KEY, {
      expiresIn: '24h',
    })

    res
      .status(200)
      .header('Authorization', `Bearer ${token}`)
      .send({ message: 'Sign in successful' })
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Oops! Something went wrong.', error: error })
  }
}

const updatePassword = async (req, res) => {
  const {
    body: { name, oldPassword, newPassword },
  } = req

  try {
    const patron = await Patron.findOne({ name })

    if (!patron)
      return res.status(401).send({ message: 'Incorrect name or password' })

    const isValid = await compare(oldPassword, patron.password)

    if (!isValid)
      return res.status(401).send({ message: 'Incorrect name or password' })

    patron.password = await hash(newPassword, 13)

    //* In general, you should use save() to update a document in Mongoose, unless you need an atomic update. (https://masteringjs.io/tutorials/mongoose/update)
    await patron.save()

    res.status(201).send({ message: 'Password update successful' })
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Oops! Something went wrong.', error: error })
  }
}

const updateInventory = async (req, res) => {
  const {
    params: { id },
    body: { quantity },
  } = req

  try {
    const patron = await Patron.findByIdAndUpdate(id, { quantity })

    if (!patron) return res.status(404).send({ message: 'User does not exist' })

    res.status(202).send({ message: 'Quantity updated successfully' })
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Oops! Something went wrong.', error: error })
  }
}

export { login, updatePassword, updateInventory }
