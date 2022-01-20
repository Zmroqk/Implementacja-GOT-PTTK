import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddProofRequest } from './dtos/requests/AddProofRequest';
import { ProofService } from './proof.service';

@ApiTags('Proof')
@Controller('proof')
export class ProofController {
   constructor(private proofService: ProofService) {}

   @Post('add')
   async addProof(@Body() proofData: AddProofRequest){
      this.proofService.addProof(proofData.documentationId, proofData.blob)
   }
}
