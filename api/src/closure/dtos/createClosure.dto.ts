import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsNumber, IsString, MaxLength } from "class-validator"

export class CreateClosureDto {
   @ApiProperty()
   @IsNumber()
   segmentId: number

   @ApiProperty()
   @IsDateString()
   dateStart: Date

   @ApiProperty()
   @IsDateString()
   dateEnd: Date

   @ApiProperty()
   @IsString()
   @MaxLength(255)
   reason: string
}