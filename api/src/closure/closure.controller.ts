import {
   BadRequestException,
   Body,
   Controller,
   Get,
   Param,
   Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Closure } from 'src/Entities/Closure.entity';
import { ClosureService } from './closure.service';
import { CreateClosureDto } from './dtos/createClosure.dto';

@ApiTags('Closure')
@Controller('closure')
export class ClosureController {
   constructor(private closureService: ClosureService) {}

   @Get()
   async getAllClosures(): Promise<Closure[]> {
      return this.closureService.getAllClosure();
   }

   @Post('open/:closure_id')
   async openClosure(@Param('closure_id') closureId: number): Promise<Closure> {
      return this.closureService.endClosure(closureId);
   }

   @Post('close')
   async createClosure(
      @Body() closureData: CreateClosureDto,
   ): Promise<Closure> {
      if (closureData.dateStart > closureData.dateEnd)
         throw new BadRequestException('End date cannot be before start date');
      return this.closureService.createClosure(
         closureData.segmentId,
         new Date(closureData.dateStart),
         new Date(closureData.dateEnd),
         closureData.reason,
      );
   }
}
