import MountainGroup from "./MountainGroup.entity";
import ApplicationType from "./ApplicationType.entity";
import { Tourist } from "./Tourist.entity";
import { Leader } from "./Leader.entity";

export enum ApplicationStatus {
    Created = "Created",
    Pending = "Pending",
    Accepted = "Accepted",
    Declined = "Declined"
 }

export default interface Application {
   id: number
   type: ApplicationType
   body: string
   // CHANGE Added status for application
   status: ApplicationStatus
   // CHANGE Added submission date
   submissionDate: Date
   // CHANGE Added requested mountain groups
   requestedMountainGroups: MountainGroup[]
   applicant: Tourist
   leaders: Leader[]
}