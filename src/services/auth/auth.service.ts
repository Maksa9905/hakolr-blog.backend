import { UserAuthenticationInfo } from '#dtos/auth'
import { CreateUserDto } from '#dtos/user'
import { userModel } from '#models/user'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

class AuthService {
  static login = async (data: UserAuthenticationInfo) => {
    const user = await userModel.findOne({ email: data.email })

    console.log(user)

    if (!user) return null

    if (data.password === user.password) {
      const jwtSecretKey = process.env.JWT_SECRET_KEY

      const tokenData = {
        time: Date(),
        _id: user._id,
      }

      const token = jwt.sign(tokenData, jwtSecretKey)

      return token
    } else return null
  }

  static validate_token = async (req, res, next) => {
    const tokenHeaderKey = process.env.TOKEN_HEADER_KEY!
    const jwtSecretKey = process.env.JWT_SECRET_KEY

    const authHeader = req.header(tokenHeaderKey!)

    if (!authHeader) {
      return res
        .status(401)
        .send({ success: 'Token is not found', token: null })
    }

    try {
      const token = req.header(tokenHeaderKey)

      const verified = jwt.verify(token, jwtSecretKey)

      if (verified) {
        return next('route')
      }

      return res.status(401).send('Invalid Token')
    } catch (error) {
      return res.status(401).send(error)
    }
  }

  static register = async (dto: CreateUserDto) => {
    const user = await userModel.create({
      _id: new mongoose.Types.ObjectId(),
      email: dto.email,
      name: dto.name,
      password: dto.password,
    })
    user.save()

    return user
  }
}

export default AuthService
