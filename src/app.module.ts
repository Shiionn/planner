import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TimeBlockModule } from './time-block/time-block.module';
import { PomodoroModule } from './timer/timer.module';

@Module({
  imports: [ConfigModule.forRoot(), 
    AuthModule, 
    UserModule, 
    TaskModule, 
    TimeBlockModule,
    PomodoroModule
  ],
})
export class AppModule {}
