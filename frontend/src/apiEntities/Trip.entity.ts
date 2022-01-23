import { Badge } from "./Badge.entity";
import { Tourist } from "./Tourist.entity";
import { TripPlan } from "./TripPlan.entity";
import Documentation from "./Documentation.entity";

export interface Trip {
   id: number
   points: number
   startDate: Date
   endDate: Date
   plan: TripPlan
   tourist: Tourist
   badge: Badge
   documentation: Documentation | null
}