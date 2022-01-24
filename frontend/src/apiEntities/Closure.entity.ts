import Segment from "./Segment.entity";

export interface Closure {
   id: number
   closedFrom: Date
   closedTo: Date
   reason: string
   segment: Segment
}