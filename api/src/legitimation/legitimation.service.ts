import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Leader } from 'src/Entities/Leader.entity';
import { MountainGroup } from 'src/Entities/MountainGroup.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class LegitimationService {
   constructor(
      @InjectRepository(Leader)
      private leaderRepository: Repository<Leader>,
      @InjectRepository(MountainGroup)
      private mountainGroupRepository: Repository<MountainGroup>,
   ) {}

   async updateLeaderPermissions(
      leaderId: number,
      mountainGroupsIds: number[],
   ) {
      const leader = await this.leaderRepository.findOne({
         id: leaderId
      });
      if (!leader)
         throw new NotFoundException(`Leader with id: ${leaderId} not found`);
      const mtGroupsAndCount = await this.mountainGroupRepository.findAndCount({
         id: In(mountainGroupsIds),
      });
      if (mtGroupsAndCount[1] != mountainGroupsIds.length) {
         throw new NotFoundException(
            `${
               mtGroupsAndCount[1] > mountainGroupsIds.length
                  ? mtGroupsAndCount[1] - mountainGroupsIds.length
                  : mountainGroupsIds.length - mtGroupsAndCount[1]
            } ids not found or does not exist`,
         );
      }
      leader.legitimation.mountainGroups = mtGroupsAndCount[0]
      return await this.leaderRepository.save(leader)
   }
}
