import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Closure } from 'src/Entities/Closure.entity';
import { ClosureService } from './closure.service';
import { CreateClosureDto } from './dtos/createClosure.dto';

@Controller('closure')
export class ClosureController {
   constructor(private closureService: ClosureService) {}

   @Get()
   async getAllClosures(): Promise<Closure[]> {
      return this.closureService.getAllClosure();
   }

   @Get('open/:closure_id')
   async openClosure(@Param() closureId: number): Promise<Closure> {
      return this.closureService.endClosure(closureId);
   }

   @Post('close')
   async createClosure(@Body() closureData: CreateClosureDto): Promise<Closure> {
      if(closureData.dateStart > closureData.dateEnd)
         throw new BadRequestException('End date cannot be before start date')
      return this.closureService.createClosure(
         closureData.segmentId,
         closureData.dateStart,
         closureData.dateEnd,
      );      
   }
}
