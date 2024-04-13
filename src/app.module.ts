import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, TaskModule],
})
export class AppModule {}
