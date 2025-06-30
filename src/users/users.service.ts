import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './model/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import  * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userRepository:Model<User>, private jwtService:JwtService ) {}

    

    async register(userDto: User): Promise<{token: string}> {

        const  { email, password } = userDto
        const registerd = await this.userRepository.findOne({email})
        if(registerd) {
            throw new Error("Already a Registerd")
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await this.userRepository.create({
            email,
            password:hashedPassword
        })
        
        let  token = await this.jwtService.sign({id:user._id})
        return {token}
    }


    async login(userDto: User):Promise<{token: string}> {
        const { email, password } = userDto;
        const user = await this.userRepository.findOne({email})
        if(!user) {
            throw new Error("User not found")
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            throw new Error('Invalid User Please Register')
        }
        const token = this.jwtService.sign({id:user._id})
        return {token}
    }

    async findById(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }



    async validateUser(id:string, password:string): Promise<any> {
        const user = await this.userRepository.findById(id);
        if(!user) {
            throw new UnauthorizedException('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }
        return {id: user._id , email: user.email};

    }
}

