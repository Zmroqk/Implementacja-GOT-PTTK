import Waypoint from "./Waypoint.entity";

export interface Segment {
   id: number
   name: string
   points: number
   pointsReverse: number
   via: string
   inPoland: boolean
   startPoint: Waypoint
   endPoint: Waypoint
}

export default Segment