import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Admin } from './Entities/Admin.entity';
import { Application } from './Entities/Application.entity';
import { ApplicationType } from './Entities/ApplicationType.entity';
import { Badge } from './Entities/Badge.entity';
import { BadgeLevel } from './Entities/BadgeLevel.entity';
import { BadgeType } from './Entities/BadgeType.entity';
import { Closure } from './Entities/Closure.entity';
import { Color } from './Entities/Color.entity';
import { Documentation } from './Entities/Documentation.entity';
import { DocumentationProve } from './Entities/DocumentationProve.entity';
import { DocumentationStatus } from './Entities/DocumentationStatus.entity';
import { HikingTrail } from './Entities/HikingTrail.entity';
import { Leader } from './Entities/Leader.entity';
import { LeaderLegitimation } from './Entities/LeaderLegitimation.entity';
import { MountainGroup } from './Entities/MountainGroup.entity';
import { MountainRange } from './Entities/MountainRange.entity';
import { PTTKBook } from './Entities/PTTKBook.entity';
import { Segment } from './Entities/Segment.entity';
import { Tourist } from './Entities/Tourist.entity';
import { Trip } from './Entities/Trip.entity';
import { TripPlan } from './Entities/TripPlan.entity';
import { TripSegment } from './Entities/TripSegment.entity';
import { User } from './Entities/User.entity';
import { UserSegment } from './Entities/UserSegment.entity';
import { Waypoint } from './Entities/Waypoint.entity';
import { TouristModule } from './tourist/tourist.module';
import { AdminModule } from './admin/admin.module';
import { LeaderModule } from './leader/leader.module';
import { RouterModule } from '@nestjs/core';
import { DatabaseSeederModule } from './database-seeder/database-seeder.module';
import { MountainGroupsService } from './mountain-groups/mountain-groups.service';
import { LegitimationService } from './legitimation/legitimation.service';

@Module({
   imports: [
      TypeOrmModule.forRoot({
         type: 'mysql',
         host: process.env['DB_HOST'],
         port: Number.parseInt(process.env['DB_PORT']) || 3000,
         username: process.env['DB_USER'],
         password: process.env['DB_PASS'],
         database: process.env['DB_DATABASE'],
         entities: [
            PTTKBook,
            User,
            Tourist,
            Leader,
            Admin,
            ApplicationType,
            Application,
            LeaderLegitimation,
            MountainGroup,
            MountainRange,
            Waypoint,
            Segment,
            HikingTrail,
            Color,
            Closure,
            UserSegment,
            TripSegment,
            TripPlan,
            Trip,
            Badge,
            BadgeType,
            BadgeLevel,
            Documentation,
            DocumentationStatus,
            DocumentationProve,
         ],
         synchronize: JSON.parse(process.env['DB_SYNC']) || false,
         cache: false,
      }),
      AdminModule,
      TouristModule,
      LeaderModule,
      RouterModule.register([
         {
            module: AdminModule,
            path: 'Admin',
         },
         { module: TouristModule, path: 'Tourist' },
         { module: LeaderModule, path: 'Leader' },
      ]),
      DatabaseSeederModule,
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
