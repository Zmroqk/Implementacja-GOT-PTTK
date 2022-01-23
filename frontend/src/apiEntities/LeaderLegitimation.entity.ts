import MountainGroup from "./MountainGroup.entity";
import { Leader } from "./Leader.entity";

export default interface LeaderLegitimation {

   id: number
   leader: Leader
   mountainGroups: MountainGroup[]
}