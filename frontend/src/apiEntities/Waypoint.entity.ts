import MountainRange from "./MountainRange.entity";
import Segment from "./Segment.entity";

export default interface Waypoint {
   id: number
   name: string
   height: number
   mountainRange: MountainRange
   segments: Segment[]
}