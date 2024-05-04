import mongoose from 'mongoose'

import Product from '../models/product.model.js'

const createProduct = async (req, res) => {
  const {
    body: { name },
  } = req

  try {
    const product = await Product.findOne({ name })

    if (product)
      return res
        .status(409)
        .send({ message: 'A product with that name already exist' })

    await Product.create(req.body)

    res.status(201).send({ message: 'Product created successfully' })
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Oops! Something went wrong', error: error })
  }
}

const updateInventory = async (req, res) => {
  const {
    body: { quantity },
    params: { id },
  } = req

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send({ message: 'Product does not exist' })

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    )

    if (!product)
      return res.status(404).send({ messge: 'Product does not exist' })

    res.status(201).send({ message: 'Quantity updated successfully' })
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Oops! Something went wrong', error: error })
  }
}

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(
      {},
      { name: 1, quantity: 1, unit_price: 1 }
    )

    if (!products)
      return res.status(404).send({ message: 'No product was found' })

    res.status(200).send(products)
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Oops! Something went wrong', error: error })
  }
}

export { createProduct, updateInventory, getAllProducts }
