import { IsArray, IsNumber, IsString, MaxLength } from "class-validator";
import { SegmentDto } from "./SegmentDto";

export class CreateTripPlanDto {
   @IsNumber()
   user_id: number

   @IsArray()
   segments: SegmentDto[]

   @IsString()
   @MaxLength(2000)
   description: string
}