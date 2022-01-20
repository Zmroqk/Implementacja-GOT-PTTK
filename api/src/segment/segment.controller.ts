import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSegmentDataDto } from './dtos/createSegmentData.dto';
import { RequiredDataCreateSegmentData } from './dtos/requiredDataCreateSegment.dto';
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
}
