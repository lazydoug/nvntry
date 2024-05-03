import { validationResult } from 'express-validator'

const validationHandler = (req, res, next) => {
  const result = validationResult(req)

  if (!result.isEmpty())
    return res.status(400).send({ message: result.array()[0].msg })

  next()
}

export default validationHandler
