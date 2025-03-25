import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
const cookieSession = require('cookie-session');
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url : 'mongodb://127.0.0.1:27017/columnLiverpool',
      synchronize: true,
      logging: true,
      useUnifiedTopology : true,
      useNewUrlParser : true,
      entities : [User]
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      cookieSession({
        keys: ['hong-won-tae'],
        name: 'hwt-cookie',
        httpOnly: true,
        secure: false,
      }),
    );
  }
}
