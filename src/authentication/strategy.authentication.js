import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { config } from 'dotenv'

import Admin from '../models/admin.model.js'
import Patron from '../models/patron.model.js'

config()

passport.use(
  'admin-strategy',
  new Strategy(
    {
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (jwt_payload, done) => {
      const { email } = jwt_payload
      try {
        const user = await Admin.findOne({ email })

        if (!user) return done(Error('Invalid token'), false)

        done(null, user)
      } catch (error) {
        done(error, false)
      }
    }
  )
)

passport.use(
  'patron-strategy',
  new Strategy(
    {
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (jwt_payload, done) => {
      const { name } = jwt_payload

      try {
        const patron = await Patron.findOne({ name })

        if (!patron) return done(new Error('Invalid token', false))

        done(null, patron)
      } catch (error) {
        done(error, false)
      }
    }
  )
)
