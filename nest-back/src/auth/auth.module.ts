import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
     useFactory: (configService: ConfigService) => {
  const secretKey = configService.get<string>('SECRET_KEY');
  const expireTime = configService.get<string>('EXPIRE_H');
  
  console.log('SECRET_KEY:', secretKey); // 로그로 확인
  console.log('EXPIRE_H:', expireTime);  // 로그로 확인
  
  return {
    secret: secretKey,
    signOptions: { expiresIn: expireTime },
  };
}
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
