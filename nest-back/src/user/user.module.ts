import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';


@Module({
    imports : [TypeOrmModule.forFeature([UserEntity]), AuthModule],
    controllers : [UserController],
    providers : [UserService],
    exports : [UserService]
})
export class UserModule {
}
