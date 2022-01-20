import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString, MaxLength } from "class-validator";
import { SegmentDto } from "./SegmentDto";

export class CreateTripPlanDto {
   @ApiProperty()
   @IsNumber()
   user_id: number

   @ApiProperty({type: [SegmentDto]})
   @IsArray()
   segments: SegmentDto[]

   @ApiProperty()
   @IsString()
   @MaxLength(2000)
   description: string
}