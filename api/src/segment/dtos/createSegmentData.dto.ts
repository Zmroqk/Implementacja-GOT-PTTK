import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNumber, IsString, MaxLength, Min } from "class-validator"

export class CreateSegmentDataDto {
   @ApiProperty()
   @IsNumber()
   waypointFromId: number

   @ApiProperty()
   @IsNumber()
   waypointEndId: number

   @ApiProperty()
   @IsString()
   @MaxLength(255)
   via: string

   @ApiProperty()
   @IsNumber()
   @Min(0)
   points: number

   @ApiProperty()
   @IsNumber()
   @Min(0)
   pointsReverse: number

   @ApiProperty()
   @IsBoolean()
   inPoland: boolean
}