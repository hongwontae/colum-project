import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({defaultStrategy : 'jwt'}),
    JwtModule.registerAsync({
      imports : [ConfigModule],
      inject : [ConfigService],
      useFactory : (configService : ConfigService)=>({
        secret : configService.get<string>('JWT_SECRET_KEY'),
        signOptions : {
          expiresIn : configService.get<string>('EXPIREH')
        }
      })
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
