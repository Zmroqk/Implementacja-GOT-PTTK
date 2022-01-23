import { Tourist } from "./Tourist.entity";
import Application from "./Application.entity";
import LeaderLegitimation from "./LeaderLegitimation.entity";
import Documentation from "./Documentation.entity";

export default interface Leader {

   id: number
   tourist: Tourist
   nominateDate: Date
   applications: Application[]
   legitimation: LeaderLegitimation
   checkedDocumentations: Documentation[]
}