import { Body, Controller, Post } from '@nestjs/common';
import { AddProofRequest } from './dtos/requests/AddProofRequest';
import { ProofService } from './proof.service';

@Controller('proof')
export class ProofController {
   constructor(private proofService: ProofService) {}

   @Post('add')
   async addProof(@Body() proofData: AddProofRequest){
      this.proofService.addProof(proofData.documentationId, proofData.blob)
   }
}
