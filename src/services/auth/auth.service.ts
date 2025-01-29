import { UserAuthenticationInfo } from '#dtos/auth'
import { CreateUserDto } from '#dtos/user'
import { TokenData } from '#models/auth'
import { userModel } from '#models/user'
import { dayMilliseconds } from '#shared/lib/consts.ts'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

class AuthService {
  static login = async (data: UserAuthenticationInfo) => {
    const user = await userModel.findOne({ email: data.email })

    if (!user) return null

    if (data.password === user.password) {
      const jwtSecretKey = process.env.JWT_SECRET_KEY

      const tokenData: TokenData = {
        time: Date(),
        _id: user._id,
      }

      const token = jwt.sign(tokenData, jwtSecretKey)

      return token
    } else return null
  }

  static validate_token = async (token: string) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY

    if (!token) {
      return false
    }

    try {
      const verified = jwt.verify(token, jwtSecretKey)

      if (verified) {
        const tokenData: TokenData = jwt.decode(token)

        const loggedDate = new Date(tokenData.time)
        const now = new Date()

        if (loggedDate.getTime() - now.getTime() < 2 * dayMilliseconds) {
          return true
        }
      }

      return false
    } catch (error) {
      return false
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
