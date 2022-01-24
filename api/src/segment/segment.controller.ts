import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Segment } from 'src/Entities/Segment.entity';
import { CreateSegmentDataDto } from './dtos/createSegmentData.dto';
import { RequiredDataCreateSegmentData } from './dtos/requiredDataCreateSegment.dto';
import { UpdateSegmentDataDto } from './dtos/updateSegmentData.dto';
import { SegmentService } from './segment.service';


@ApiTags('Segment')
@Controller('segment')
export class SegmentController {
   constructor(private segmentService: SegmentService) {}

   @Get('create')
   async getData(): Promise<RequiredDataCreateSegmentData> {
      return this.segmentService.getData();
   }

   @Post('create')
   async createSegment(@Body() createSegmentData: CreateSegmentDataDto) {
      return this.segmentService.createSegment(
         createSegmentData.waypointFromId,
         createSegmentData.waypointEndId,
         createSegmentData.via,
         createSegmentData.points,
         createSegmentData.pointsReverse,
         createSegmentData.inPoland
      );
   }

   @Patch(':id')
   async updateSegment(@Param('id') segmentId: number, @Body() updateSegmentData: UpdateSegmentDataDto): Promise<Segment> {
      return await this.segmentService.updateSegment(segmentId, updateSegmentData.points, updateSegmentData.pointsReverse)
   }
}
