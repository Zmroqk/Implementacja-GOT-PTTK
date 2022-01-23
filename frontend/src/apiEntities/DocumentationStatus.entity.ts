import Documentation from "./Documentation.entity";

export default interface DocumentationStatus {

   id: number
   status: string
   documents: Documentation[]
}