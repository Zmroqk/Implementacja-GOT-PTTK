import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Admin } from './Entities/Admin.entity';
import { Application } from './Entities/Application.entity';
import { ApplicationType } from './Entities/ApplicationType.entity';
import { Closure } from './Entities/Closure.entity';
import { Color } from './Entities/Color.entity';
import { HikingTrail } from './Entities/HikingTrail.entity';
import { Leader } from './Entities/Leader.entity';
import { LeaderLegitimation } from './Entities/LeaderLegitimation.entity';
import { MountainGroup } from './Entities/MountainGroup.entity';
import { MountainRange } from './Entities/MountainRange.entity';
import { Segment } from './Entities/Segment.entity';
import { Tourist } from './Entities/Tourist.entity';
import { TripPlan } from './Entities/TripPlan.entity';
import { TripSegment } from './Entities/TripSegment.entity';
import { User } from './Entities/User.entity';
import { UserSegment } from './Entities/UserSegment.entity';
import { Waypoint } from './Entities/Waypoint.entity';

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
        
      ],
      synchronize: JSON.parse(process.env['DB_SYNC']) || false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
