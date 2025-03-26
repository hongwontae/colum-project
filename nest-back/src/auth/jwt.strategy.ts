import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { PayloadType } from './auth-type/PayloadType';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService, private authService : AuthService) {
    super({
        // JWT를 http 요청 헤더에서 가져오는 방식을 지정합니다.
        // 클라이언트가 요청할 떄 Authorization : BearerToken으로 요청해야 합니다.
        // 이런 요청이 들어오면 알아서 Passport가 헤더에서 토큰을 추출합니다.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // JWT가 완료 되었을 떄 인증을 거부하고 401 에러를 던집니다.
      ignoreExpiration: false,
      // 환경 변수 파일에서 JWT 키를 값을 가져와 서명 검증에 사용합니다.
      secretOrKey: configService.get<string>('SECRET_KEY'),
    });

  }

  async validate(payload : PayloadType){
    return this.authService.validateUser(payload);
  }

}