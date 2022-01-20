import { IsNotEmpty, IsNumber } from "class-validator";

export class AddProofRequest {
   @IsNumber()
   documentationId: number
   
   @IsNotEmpty()
   blob: string
}

