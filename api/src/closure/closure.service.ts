import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Closure } from 'src/Entities/Closure.entity';
import { Segment } from 'src/Entities/Segment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClosureService {
   constructor(
      @InjectRepository(Closure) private closureRepository: Repository<Closure>,
      @InjectRepository(Segment) private segmentRepository: Repository<Segment>
   ) {}

   async getAllClosure(): Promise<Closure[]> {
      return this.closureRepository.find()
   }

   async endClosure(closureId: number): Promise<Closure> {
      const closure = await this.closureRepository.findOne(closureId)
      if(!closure)
         throw new NotFoundException(`Closure with id: ${closureId} does not exist`)
      closure.closedTo = new Date(Date.now())
      return this.closureRepository.save(closure)
   }

   // CHANGE No description for closure
   async createClosure(segmentId: number, dateStart: Date, dateEnd: Date): Promise<Closure> {
      const segment = await this.segmentRepository.findOne(segmentId)
      if(!segment)
         throw new NotFoundException(`Segment with id: ${segmentId} does not exist`)
      const closure = new Closure()
      closure.closedFrom = dateStart
      closure.closedTo = dateEnd
      closure.segment = segment
      return this.closureRepository.save(closure)
   }
}
