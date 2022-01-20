import { IsBase64, IsNotEmpty, IsNumber } from "class-validator";

export class AddProofRequest {
   @IsNumber()
   documentationId: number
   
   @IsBase64()
   @IsNotEmpty()
   blob: string
}

