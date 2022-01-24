import MountainGroup from "./MountainGroup.entity";
import Waypoint from "./Waypoint.entity";

export default interface MountainRange {
   id: number
   name: string
   mountainGroup?: MountainGroup
   waypoints: Waypoint[]
}