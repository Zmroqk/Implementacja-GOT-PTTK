import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Leader } from 'src/Entities/Leader.entity';
import { LeaderLegitimation } from 'src/Entities/LeaderLegitimation.entity';
import { MountainGroup } from 'src/Entities/MountainGroup.entity';
import { Tourist } from 'src/Entities/Tourist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LeaderService {
   constructor(
      @InjectRepository(Leader) private leaderRepository: Repository<Leader>,
      @InjectRepository(Tourist) private touristRepository: Repository<Tourist>,
   ) {}

   async makeLeader(
      userId: number,
      permissions: MountainGroup[],
   ): Promise<Leader> {
      const tourist = await this.touristRepository.findOne(userId);
      if (!tourist) throw new NotFoundException(`Cannot find tourist with id: ${userId}`);
      const leader = new Leader();
      leader.tourist = tourist;
      leader.legitimation = new LeaderLegitimation();
      leader.legitimation.mountainGroups = permissions;
      leader.legitimation.leader = leader;
      leader.nominateDate = new Date(Date.now());
      const createdLeader = this.leaderRepository.save(leader);
      return createdLeader;
   }

   async grantPerrmissions(
      leaderId: number,
      permissions: MountainGroup[],
   ): Promise<Leader> {
      const leader = await this.leaderRepository.findOne(leaderId);
      if (!leaderId) throw new NotFoundException(`Cannot find leader with id: ${leaderId}`);
      leader.legitimation.mountainGroups.push(...permissions);
      return await this.leaderRepository.save(leader);
   }
}
