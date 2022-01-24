import MountainRange from "./MountainRange.entity";

export default interface MountainGroup {
   id: number
   name: string
   mountainRanges: MountainRange[]

}