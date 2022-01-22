import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsDate, IsNumber } from "class-validator"

export class CreateTripFromTripPlanRequest {
   
   @ApiProperty()
   @IsNumber()
   userId: number
   
   @ApiProperty()
   @IsNumber()
   tripPlanId: number
   
   @ApiProperty()
   @IsDate()
   dateStart: Date
   
   @ApiProperty()
   @IsDate()
   dateEnd: Date
   
   @ApiProperty()
   @IsBoolean()
   isLeaderPresent: boolean
}