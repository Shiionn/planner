import { Priority } from '@prisma/client'
import { Transform } from 'class-transformer'
import {IsOptional, IsString, IsNumber} from 'class-validator'



export class TimeBlockDto {
	@IsString()
	name: string

	@IsOptional()
	@IsString()
	color?: string

	@IsNumber()
	duration: number

	@IsNumber()
	@IsOptional()
	order: number //порядок блока в очереди
}

