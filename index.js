import express, { urlencoded } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use()

mongoose
  .connect(process.env.DATABASE_CONNECTION_STRING)
  .then(
    app.listen(process.env.PORT, () =>
      console.log(`DB connected. Server listening on port ${process.env.PORT}`)
    )
  )
  .catch(err => console.error('Error connecting to DB', err))
