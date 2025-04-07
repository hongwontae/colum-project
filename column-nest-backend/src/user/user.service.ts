import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class UserService {
  // repo 변수에 InjectRepository를 통해 typeorm repo를 가져옵니다.
  // Repositiry<UserEntity>를 통해 타입을 가져옵니다.
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
    private configService: ConfigService,
    private authService: AuthService,
  ) {}

  async createUser(admin: string, email: string, password: string) {
    const emailMatch = await this.repo.findOne({ where: { email } });
    if (emailMatch) {
      throw new NotFoundException('기존에 존재하는 이메일입니다.');
    }

    const hashedNumber = Number(this.configService.get<number>('HASH_lENGTH'));

    const salt = randomBytes(8).toString('hex');

    const hashedPassword = (await scrypt(
      password,
      salt,
      hashedNumber,
    )) as Buffer;

    const securityPassword = salt + '.' + hashedPassword.toString('hex');

    const user = this.repo.create({ admin, email, password: securityPassword });

    return await this.repo.save(user);
  }

  async loginUser(email: string, password: string) {
    const emailMatch = await this.repo.findOne({ where: { email } });

    if (!emailMatch) {
      throw new NotFoundException('일치하는 이메일이 없습니다.');
    }

    const hashNumber = Number(this.configService.get<string>('HASH_LENGTH'));

    const [salt, existHashedPassword] = emailMatch.password.split('.');

    const newHashedPassword = (await scrypt(
      password,
      salt,
      hashNumber,
    )) as Buffer;

    if (existHashedPassword === newHashedPassword.toString('hex')) {
      const jwtInfo =  this.authService.loginUser(emailMatch.userId, emailMatch.admin);
      return [jwtInfo, emailMatch.admin]
    } else {
      throw new NotFoundException('password가 일치하지 않습니다.')
    }
  }

  async logoutUser(){}

}
