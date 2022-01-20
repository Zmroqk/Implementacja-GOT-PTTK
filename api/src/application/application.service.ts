import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from 'src/Entities/Application.entity';
import { ApplicationType } from 'src/Entities/ApplicationType.entity';
import { ApplicationStatus } from 'src/Entities/Enums/ApplicationStatus.enum';
import { Leader } from 'src/Entities/Leader.entity';
import { LeaderService } from 'src/leader/leader.service';
import { Repository } from 'typeorm';

@Injectable()
export class ApplicationService {
   constructor(
      @InjectRepository(Application)
      private applicationsRepository: Repository<Application>,
      @Inject(LeaderService) private leaderService: LeaderService,
   ) {}

   async getAllAplications(): Promise<Application[]> {
      return this.applicationsRepository.find();
   }

   async acceptApplication(applicationId: number): Promise<Leader> {
      const application = await this.applicationsRepository.findOne(
         applicationId,
      );
      if (!application) throw new NotFoundException(`Cannot find application with id: ${applicationId}`);
      application.status = ApplicationStatus.Accepted;
      let leader = null;
      if (application.type.type === 'Grant')
         leader = await this.leaderService.makeLeader(
            application.applicant.id,
            application.requestedMountainGroups,
         );
      else if (application.type.type === 'Extend')
         leader = await this.leaderService.grantPerrmissions(
            application.applicant.id,
            application.requestedMountainGroups,
         );
      this.applicationsRepository.save(application)
      return leader
   }

   async declineApplication(applicationId: number): Promise<Application> {
      const application = await this.applicationsRepository.findOne(
         applicationId,
      );
      if (!application) throw new NotFoundException(`Cannot find application with id: ${applicationId}`);
      application.status = ApplicationStatus.Declined;
      return this.applicationsRepository.save(application)
   }
}
