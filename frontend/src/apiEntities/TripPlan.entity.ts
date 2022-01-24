import { Tourist } from "./Tourist.entity";
import { Trip } from "./Trip.entity";
import { TripSegment } from "./TripSegment.entity";

export interface TripPlan {
   id: number
   description: string | null
   points: number
   implicit: boolean | null
   author: Tourist
   tourists: Tourist[]
   trips: Trip[]
   tripSegments: TripSegment[]
}