import Segment from "./Segment.entity";

export interface Closure {
   id: number
   closedFrom: Date
   closedTo: Date
   segment: Segment
}