import { IsNumber } from "class-validator";

export class AddProofRequest {
   @IsNumber()
   documentationId: number
   // TODO file upload
}