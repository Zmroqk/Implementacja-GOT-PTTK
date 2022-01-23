import { TripPlan } from './TripPlan.entity';
import { Segment } from './Segment.entity';

export interface TripSegment {
   id: number
   direction: string
   consecutiveNumber: number
   plan: TripPlan
   segment: Segment | null
   // userSegment: UserSegment | null
}