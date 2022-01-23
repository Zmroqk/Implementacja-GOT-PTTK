import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MountainGroup } from 'src/Entities/MountainGroup.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MountainGroupsService {
   constructor(
      @InjectRepository(MountainGroup)
      private mountainGroupRepository: Repository<MountainGroup>,
   ) {}

   async getAllMountainGroups(): Promise<MountainGroup[]> {
      return await this.mountainGroupRepository.find()
   }
}
