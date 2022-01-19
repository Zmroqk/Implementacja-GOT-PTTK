import { IsBoolean, IsDate, IsNumber } from "class-validator"

export class CreateTripFromTripPlanRequest {
   @IsNumber()
   userId: number
   @IsNumber()
   tripPlanId: number
   @IsDate()
   dateStart: Date
   @IsDate()
   dateEnd: Date
   @IsBoolean()
   isLeaderPresent: boolean
}