import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsDateString, IsNumber, IsString, MaxLength } from "class-validator"

export class CreateClosureDto {
   @ApiProperty()
   @IsNumber()
   segmentId: number

   @ApiProperty()
   @IsDateString()
   dateStart: Date | string

   @ApiProperty()
   @IsDateString()
   dateEnd: Date | string

   @ApiProperty()
   @IsString()
   @MaxLength(255)
   reason: string
}