import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'
import { TaskController } from './Task.controller';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, PrismaService],
  exports: [TaskService]
})
export class TaskModule {}
