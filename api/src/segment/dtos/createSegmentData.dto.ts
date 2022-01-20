import { IsBoolean, IsNumber, IsString, MaxLength, Min } from "class-validator"

export class CreateSegmentDataDto {
   @IsNumber()
   waypointFromId: number

   @IsNumber()
   waypointEndId: number

   @IsString()
   @MaxLength(255)
   via: string

   @IsNumber()
   @Min(0)
   points: number

   @IsNumber()
   @Min(0)
   pointsReverse: number

   @IsBoolean()
   inPoland: boolean
}