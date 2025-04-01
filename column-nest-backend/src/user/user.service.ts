import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { ConfigService } from '@nestjs/config';

const scrypt = promisify(_scrypt);

@Injectable()
export class UserService {
  // repo 변수에 InjectRepository를 통해 typeorm repo를 가져옵니다.
  // Repositiry<UserEntity>를 통해 타입을 가져옵니다.
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
    private configService: ConfigService,
  ) {}

  async createUser(admin: boolean, email: string, password: string) {
    const emailMatch = await this.repo.findOne({ where: { email } });
    if (emailMatch) {
      throw new NotFoundException('기존에 존재하는 이메일입니다.');
    }

    const hashedNumber = Number(this.configService.get<number>('HASH_lENGTH'))
    
    const salt = randomBytes(8).toString('hex');

    const hashedPassword = (await scrypt(password, salt, hashedNumber)) as Buffer;

    const securityPassword = salt + '.' + hashedPassword.toString('hex');

    const user = this.repo.create({admin, email, password : securityPassword});

    return await this.repo.save(user);
  }
}
