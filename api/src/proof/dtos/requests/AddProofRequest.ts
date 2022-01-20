import { ApiProperty } from "@nestjs/swagger";
import { IsBase64, IsNotEmpty, IsNumber } from "class-validator";

export class AddProofRequest {
   @ApiProperty()
   @IsNumber()
   documentationId: number
   
   @ApiProperty()
   @IsBase64()
   @IsNotEmpty()
   blob: string
}

