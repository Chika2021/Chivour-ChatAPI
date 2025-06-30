import { ConfigService } from "@nestjs/config"
import { InjectModel } from "@nestjs/mongoose"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { User } from "./model/users.schema"
import { Model } from "mongoose"
import { Injectable } from "@nestjs/common"

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectModel(User.name) private userRepository:Model<User>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'ANYACHIKAAMAECHI'
        })
    }

    async validate(payload:any) {
      const {id} = payload
      const user = await this.userRepository.findById(id)  
      if(!user) {
        throw new Error('User Not Found')
      }
      return user
    }
}
