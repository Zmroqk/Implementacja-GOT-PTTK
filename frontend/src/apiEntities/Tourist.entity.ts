import { Badge } from "./Badge.entity";
import { Trip } from "./Trip.entity";
import { User } from "./User.entity";

export interface Tourist {
   id: number
   user: User
   isDisabled: boolean
   // applications: Application[]
   // createdSegments: UserSegment[]
   // createdPlans: TripPlan[]
   badges: Badge[]
   // usedPlans: TripPlan[]
   trips: Trip[]
   // book: PTTKBook
}