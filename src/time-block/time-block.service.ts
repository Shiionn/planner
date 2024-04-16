import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TimeBlockDto } from './dto/time-block.dto'

//import { startOfDay, subDays } from 'date-fns'

@Injectable()
export class TimeBlockService {
	constructor(private prisma: PrismaService) {}

	//получение 
	async getAll(userId: string){
		return this.prisma.timeBlock.findMany({
			where:{
				userId
			},
			orderBy: {
				order: 'asc' //сортировка по возрастанию
			},
		})
	}

	//создание 
	async create (dto: TimeBlockDto, userId:string){
		return this.prisma.timeBlock.create({
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
	

	//обновление 
	async update(
		dto: Partial<TimeBlockDto>,
		timeBlockId: string,
		userId: string
	) {
		return this.prisma.timeBlock.update({
			where: {
				userId,
				id: timeBlockId
			},
			data: dto
		})
	}

     
	//удаление 
	async delete ( timeBlockId: string, userId:string){
		return this.prisma.timeBlock.delete({
			where:{
				id: timeBlockId,
				userId,
			},
		});
	}

	async updateOrder(ids:string[]){
		return this.prisma.$transaction(
			ids.map((id,order)=>
				this.prisma.timeBlock.update({
					where:{id},
					data:  {order}
				})
			)
		)
	}

}
