import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsNumber, Validate } from "class-validator"

export class CreateClosureDto {
   @ApiProperty()
   @IsNumber()
   segmentId: number

   @ApiProperty()
   @IsDate()
   dateStart: Date

   @ApiProperty()
   @IsDate()
   dateEnd: Date
}