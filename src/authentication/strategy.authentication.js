import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { config } from 'dotenv'

import Admin from '../models/admin.model.js'

config()

passport.use(
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
