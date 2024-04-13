import { Injectable } from '@nestjs/common'
//import { hash } from 'argon2'
//import { AuthDto } from 'src/auth/dto/auth.dto'
import { PrismaService } from 'src/prisma.service'
import { TaskDto } from './task.dto'

//import { startOfDay, subDays } from 'date-fns'

@Injectable()
export class TaskService {
	constructor(private prisma: PrismaService) {}

	//получение всех задач текущего пользвателя 
	async getAll(userId: string){
		return this.prisma.task.findMany({
			where:{
				userId
			}
		})
	}

	//создание задач 
	async create (dto: TaskDto, userId:string){
		return this.prisma.task.create({
			data:{
				...dto,
				user:{
					connect:{
						id: userId,
					},
				},
			},
		});
	}
	

	//обновление задач 
	async update (dto: Partial<TaskDto>, taskId: string, userId:string){
		return this.prisma.task.update({
			where:{
				userId,
				id: taskId	
			},
			data: dto
		});
	}

     
	//удаление 
	async delete ( taskId: string){
		return this.prisma.task.delete({
			where:{
				id: taskId	
			},
		});
	}

	}
