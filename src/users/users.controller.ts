import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './model/users.schema';

@Controller('users')
export class UsersController {

    constructor(private userService:UsersService){}

    @Post('register')
        async register(@Body() userDto:User):Promise<any> {
            return await this.userService.register(userDto)
        }

    @Get('login')
        async login(@Body() userDto:User) {
            return await this.userService.login(userDto)
        }

}
