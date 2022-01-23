import Documentation from "./Documentation.entity";
import { Tourist } from "./Tourist.entity";

export default interface PTTKBook {

   id: number
   tourist: Tourist
   documentations: Documentation[]
}