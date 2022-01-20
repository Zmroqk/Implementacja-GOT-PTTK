import { IsBoolean, IsNumber, IsString } from "class-validator";
import { Segment } from "src/Entities/Segment.entity";

export class SegmentDto { 
   @IsNumber()
   id: number

   @IsNumber()
   orderNumber: number

   @IsBoolean()
   reverse: boolean

   @IsBoolean()
   isUserSegment: boolean
}