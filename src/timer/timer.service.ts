import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { PomodoroRoundDto, PomodoroSessionDto } from './timer.dto'




@Injectable()
export class PomodoroService {
	constructor(private prisma: PrismaService) {}

	//получение сегодняшней сессии (один день-одна сессия)
	async getTodaySession(userId: string){
		const today = new Date().toISOString().split('T')[0]

		return this.prisma.pomodoroSession.findFirst({
			where:{
				createdAt:{
					gte: new Date(today),
				},
				userId
			},
			include:{
				rounds:{
					orderBy:{
						id: 'desc',
					},

				},
			},
		})

	}





	//создание новой сессии 
	async create (userId: string){
		const todaySession = await this.getTodaySession(userId)

		if (todaySession) return todaySession //если сессия есть - возвращаем ее


		const user = await this.prisma.user.findUnique({ //плучаем уникального пользователя
			where:{
				id:userId,
			},
			select:{ //берем у пользователя количество интервалов 
				intervalsCount:true,
			},
		})


		
		if (!user) throw new NotFoundException('User not found') //если не нашли пользователя выводим ошибку 
		
		return this.prisma.pomodoroSession.create({
			data: {
				rounds: {
					createMany: {
						data: Array.from({ length: user.intervalsCount }, () => ({
							totalSeconds: 0
						}))
					}
				},
				user: {
					connect: {
						id: userId
					}
				}
			},
			include: {
				rounds: true
			}
		})
	}

	async update(
		dto: Partial<PomodoroSessionDto>,
		pomodoroId: string,
		userId: string
	) {
		return this.prisma.pomodoroSession.update({
			where: {
				userId,
				id: pomodoroId
			},
			data: dto
		})
	}

	async updateRound(dto: Partial<PomodoroRoundDto>, roundId: string) {
		return this.prisma.pomodoroRound.update({
			where: {
				id: roundId
			},
			data: dto
		})
	}


	//удление сессии
	async deleteSession(sessionId: string, userId: string) {
		return this.prisma.pomodoroSession.delete({
			where: {
				id: sessionId,
				userId
			}
		})
	}



	}
