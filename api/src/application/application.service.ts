import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from 'src/Entities/Application.entity';
import { LeaderService } from 'src/leader/leader.service';
import { Repository } from 'typeorm';

@Injectable()
export class ApplicationService {
   constructor(
      @InjectRepository(Application)
      private applicationsRepository: Repository<Application>,
      @Inject(LeaderService) private leaderService: LeaderService
   ) {}

   async getAllAplications(): Promise<Application[]> {
      return this.applicationsRepository.find();
   }

   async createLeader(applicationId: number) {
      const application = await this.applicationsRepository.findOne(applicationId)
      if(!application)
         return null
      this.leaderService.makeLeader(application.applicant, application.type) // TODO application type Zarzadzanie przodownikami 3.1.1.1
   }
}
