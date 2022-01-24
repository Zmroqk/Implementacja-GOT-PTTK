import Application from "./Application.entity";

export default interface ApplicationType {

   id: number
   type: string
   applications: Application[]
}