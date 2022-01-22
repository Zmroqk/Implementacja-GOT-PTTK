import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber } from "class-validator";

export class SegmentDto { 
   @ApiProperty()
   @IsNumber()
   id: number

   @ApiProperty()
   @IsNumber()
   orderNumber: number

   @ApiProperty()
   @IsBoolean()
   reverse: boolean

   @ApiProperty()
   @IsBoolean()
   isUserSegment: boolean
}