import { BadgeLevel } from "./BadgeLevel.entity";
import { BadgeType } from "./BadgeType.entity";
import { Tourist } from "./Tourist.entity";

export interface Badge {
    id: number
    receivedDate: Date | null
    // trips: Trip[]
    type: BadgeType
    level: BadgeLevel
    tourist: Tourist
    touristId: number
 }