import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, Min } from "class-validator"

export class UpdateSegmentDataDto {
   @ApiProperty()
   @IsNumber()
   @Min(0)
   points: number

   @ApiProperty()
   @IsNumber()
   @Min(0)
   pointsReverse: number
}