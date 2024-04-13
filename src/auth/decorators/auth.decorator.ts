import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../guards/jwt.guards'
//import { JwtAuthGuard } from '../guards/jwt.guard'

export const Auth = () => UseGuards(JwtAuthGuard)
