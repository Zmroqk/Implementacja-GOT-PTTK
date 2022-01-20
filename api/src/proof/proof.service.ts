import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Documentation } from 'src/Entities/Documentation.entity';
import { DocumentationProve } from 'src/Entities/DocumentationProve.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProofService {
   constructor(
      @InjectRepository(Documentation)
      private documentationRepository: Repository<Documentation>,
   ) {}

   async addProof(documentation_id: number, blob: string) {
      const documentation = await this.documentationRepository.findOne(documentation_id)
      if(!documentation)
         return null
      const prove = new DocumentationProve()
      prove.blob = blob
      documentation.proves.push(prove)
      const doc = await this.documentationRepository.save(documentation)
      return doc.proves[-1]
   }
}
