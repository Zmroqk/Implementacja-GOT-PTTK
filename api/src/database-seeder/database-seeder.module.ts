import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/Entities/Admin.entity';
import { Badge } from 'src/Entities/Badge.entity';
import { BadgeLevel } from 'src/Entities/BadgeLevel.entity';
import { BadgeType } from 'src/Entities/BadgeType.entity';
import { Leader } from 'src/Entities/Leader.entity';
import { LeaderLegitimation } from 'src/Entities/LeaderLegitimation.entity';
import { MountainGroup } from 'src/Entities/MountainGroup.entity';
import { MountainRange } from 'src/Entities/MountainRange.entity';
import { Tourist } from 'src/Entities/Tourist.entity';
import { User } from 'src/Entities/User.entity';
import { Waypoint } from 'src/Entities/Waypoint.entity';
import { DatabaseSeederController } from './database-seeder.controller';
import { DatabaseSeederService } from './database-seeder.service';

@Module({
   imports: [
      TypeOrmModule.forFeature([
         Admin,
         User,
         Tourist,
         Leader,
         Badge,
         Waypoint,
         MountainGroup,
         MountainRange,
         BadgeType,
         BadgeLevel,
         LeaderLegitimation,
      ]),
   ],
   controllers: [DatabaseSeederController],
   providers: [DatabaseSeederService],
})
export class DatabaseSeederModule {}
