import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './modules/email/email.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
