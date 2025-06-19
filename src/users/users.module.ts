import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/users.schema';
import { JwtModule } from '@nestjs/jwt';
import e from 'express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync(
      {
        useFactory: () => {
          return {
            secret: 'ANYACHIKAAMAECHI',
            signOptions: {
              expiresIn: '1d'
            }
          }
        }
      }
    )
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
