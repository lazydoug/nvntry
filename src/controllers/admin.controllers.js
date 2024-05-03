import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

import Admin from '../models/admin.model.js'
import Patron from '../models/patron.model.js'

config()

const signup = async (req, res) => {
  const {
    body: { email, password },
  } = req

  try {
    const user = await Admin.findOne({ email })

    if (user)
      return res
        .status(409)
        .send({ message: 'A user with that email already exists' })

    const hashedPassword = await hash(password, 13)

    await Admin.create({ email, password: hashedPassword })

    res.status(201).send({ message: 'Registration successful' })
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Oops! Something went wrong', error: error })
  }
}

const login = async (req, res) => {
  const {
    body: { email, password },
  } = req

  try {
    const user = await Admin.findOne({ email })

    if (!user)
      return res.status(401).send({ message: 'Incorrect email or password' })

    const isValid = await compare(password, user.password)

    if (!isValid)
      return res.status(401).send({ message: 'Incorrect email or password' })

    jwt.sign(
      { email },
      process.env.SECRET_KEY,
      {
        expiresIn: '24h',
      },
      (err, token) => {
        if (err) throw new Error(err)

        res
          .status(200)
          .header('Authorization', `Bearer ${token}`)
          .send({ message: 'Sign in successful' })
      }
    )
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Oops! Something went wrong', error: error })
  }
}

const createPatron = async (req, res) => {
  const {
    body: { name, product, quantity },
  } = req

  try {
    const patron = await Patron.findOne({ name })

    if (patron)
      return res.status(409).send({ message: 'Patron already exists' })

    const password = await hash('A1B1cthree', 13)

    await Patron.create({
      name,
      product,
      quantity,
      password,
    })

    res.status(201).send({ message: 'Patron created successfully' })
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Oops! Something went wrong', error: error })
  }
}

export default { signup, login, createPatron }
