import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
    imports : [TypeOrmModule.forFeature([UserEntity]), AuthModule],
    providers : [UserService],
    exports : [UserService],
    controllers : [UserController]
})
export class UserModule {}