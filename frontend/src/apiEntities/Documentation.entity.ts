import { Leader } from "./Leader.entity";
import { Trip } from "./Trip.entity";
import PTTKBook from "./PTTKBook.entity";
import DocumentationStatus from "./DocumentationStatus.entity";
import DocumentationProve from "./DocumentationProve.entity";

export default interface Documentation {

   id: number
   description: string | null
   checker: Leader | null
   trip: Trip
   book: PTTKBook
   status: DocumentationStatus
   proves: DocumentationProve[]
}