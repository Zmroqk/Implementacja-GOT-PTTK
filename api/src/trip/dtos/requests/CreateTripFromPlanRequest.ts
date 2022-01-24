import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsDateString, IsNumber } from "class-validator"

export class CreateTripFromTripPlanRequest {
   
   @ApiProperty()
   @IsNumber()
   userId: number
   
   @ApiProperty()
   @IsNumber()
   tripPlanId: number
   
   @ApiProperty()
   @IsDateString()
   dateStart: Date | string
   
   @ApiProperty()
   @IsDateString()
   dateEnd: Date | string
   
   @ApiProperty()
   isLeaderPresent: boolean
}