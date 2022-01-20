import { MountainGroup } from "src/Entities/MountainGroup.entity";
import { MountainRange } from "src/Entities/MountainRange.entity";
import { Waypoint } from "src/Entities/Waypoint.entity";

export class RequiredDataCreateSegmentData {
   mountainGroups: MountainGroup[]
   mountainRanges: MountainRange[]
   waypoints: Waypoint[]
}