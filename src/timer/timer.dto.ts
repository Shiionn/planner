import {IsOptional, IsBoolean,IsNumber} from 'class-validator'


//сущность для сессии 
export class PomodoroSessionDto {
	@IsOptional()
	@IsBoolean()
	isCompleted: boolean
}

//сущность для круга 
export class PomodoroRoundDto{
	@IsNumber()
	totalSeconds: number

	@IsOptional()
	@IsBoolean()
	isCompleted: boolean
}

