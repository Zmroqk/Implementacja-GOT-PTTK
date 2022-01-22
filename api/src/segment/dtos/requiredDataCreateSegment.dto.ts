import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { MountainGroup } from "src/Entities/MountainGroup.entity";
import { MountainRange } from "src/Entities/MountainRange.entity";
import { Segment } from "src/Entities/Segment.entity";
import { Waypoint } from "src/Entities/Waypoint.entity";

export class RequiredDataCreateSegmentData {
   @ApiProperty({type: [MountainGroup]})
   mountainGroups: MountainGroup[]

   @ApiProperty({type: [MountainRange]})
   mountainRanges: MountainRange[]
   
   @ApiProperty({type: [Waypoint]})
   waypoints: Waypoint[]

   @ApiProperty({type: [Segment]})
   segments: Segment[]
}