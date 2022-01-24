import { TypeOrmModule } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Connection } from 'typeorm';
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
import { ApplicationStatus } from './Entities/Enums/ApplicationStatus.enum';
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

export const TypeOrmTestingModule = () => [
   TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'test',
      host: '127.0.0.1',
      username: process.env['DB_USER'],
      password: process.env['DB_PASS'],
      dropSchema: true,
      port: 3306,
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
      synchronize: true,
   }),
   TypeOrmModule.forFeature([
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
   ]),
];

async function seedBadges(
   badgeTypeRepository,
   badgeLevelRepository,
   badgeRepository,
) {
   const badgeLevel = new BadgeLevel();
   badgeLevel.level = 'Brązowa';
   const badgeLevelSilver = new BadgeLevel();
   badgeLevelSilver.level = 'Srebna';
   const badgeType = new BadgeType();
   badgeType.type = 'Mała';
   const badgeTypeMedium = new BadgeType();
   badgeTypeMedium.type = 'Średnia';

   const badgeTypes = await badgeTypeRepository.save([
      badgeType,
      badgeTypeMedium,
   ]);
   const badgeLevels = await badgeLevelRepository.save([
      badgeLevel,
      badgeLevelSilver,
   ]);

   const badge1 = new Badge();
   badge1.level = badgeLevels[0];
   badge1.receivedDate = null;
   badge1.type = badgeTypes[1];

   const badge2 = new Badge();
   badge2.level = badgeLevels[0];
   badge2.receivedDate = new Date('2020-12-23');
   badge2.type = badgeTypes[0];

   const badge3 = new Badge();
   badge3.level = badgeLevels[0];
   badge3.type = badgeTypes[0];
   badge3.receivedDate = null;

   const badge4 = new Badge();
   badge4.level = badgeLevels[0];
   badge4.type = badgeTypes[0];
   badge4.receivedDate = null;

   const badge5 = new Badge();
   badge5.level = badgeLevels[0];
   badge5.type = badgeTypes[0];
   badge5.receivedDate = null;

   const badges = [badge1, badge2, badge3, badge4, badge5];

   return await badgeRepository.save(badges);
}

async function seedWaypoints(waypointRepository) {
   const waypoint1 = new Waypoint();
   waypoint1.height = 1300;
   waypoint1.name = 'Rusinowa Polanka';

   const waypoint2 = new Waypoint();
   waypoint2.height = -1;
   waypoint2.name = 'Dolina Filipka';

   const waypoint3 = new Waypoint();
   waypoint3.height = 1036;
   waypoint3.name = 'Wierch Porońca';

   const waypoint4 = new Waypoint();
   waypoint4.height = -1;
   waypoint4.name = 'Droga "Pod Reglami"';

   const waypoint5 = new Waypoint();
   waypoint5.height = -1;
   waypoint5.name = 'Kiry-Gronik';

   const waypoint6 = new Waypoint();
   waypoint6.height = -1;
   waypoint6.name = 'Gronik-Roma';

   const waypoint7 = new Waypoint();
   waypoint7.height = -1;
   waypoint7.name = 'Dzięgielów - Zamek';

   const waypoint8 = new Waypoint();
   waypoint8.height = -1;
   waypoint8.name = 'Leszna Góra';

   const waypoint9 = new Waypoint();
   waypoint9.height = -1;
   waypoint9.name = 'Goleszowo';

   const waypoint10 = new Waypoint();
   waypoint10.height = 749;
   waypoint10.name = 'Bujakowski Groń';

   const waypoint11 = new Waypoint();
   waypoint11.height = -1;
   waypoint11.name = 'Kozy';

   const waypoint12 = new Waypoint();
   waypoint12.height = -1;
   waypoint12.name = 'Bujakowo';

   const waypoints = [
      waypoint1,
      waypoint2,
      waypoint3,
      waypoint4,
      waypoint5,
      waypoint6,
      waypoint7,
      waypoint8,
      waypoint9,
      waypoint10,
      waypoint11,
      waypoint12,
   ];

   return await waypointRepository.save(waypoints);
}

async function seedMountainRanges(
   waypoints: Waypoint[],
   mountainRangeRepository,
) {
   const mountainRange1 = new MountainRange();
   mountainRange1.name = 'Tatry Wysokie';
   mountainRange1.waypoints = [];
   mountainRange1.waypoints.push(waypoints[0]);
   mountainRange1.waypoints.push(waypoints[1]);
   mountainRange1.waypoints.push(waypoints[2]);
   const mountainRange2 = new MountainRange();
   mountainRange2.name = 'Tatry Zachodnie';
   mountainRange2.waypoints = [];
   mountainRange2.waypoints.push(waypoints[3]);
   mountainRange2.waypoints.push(waypoints[4]);
   mountainRange2.waypoints.push(waypoints[5]);

   const mountainRange3 = new MountainRange();
   mountainRange3.name = 'Beskid Śląski';
   mountainRange3.waypoints = [];
   mountainRange3.waypoints.push(waypoints[6]);
   mountainRange3.waypoints.push(waypoints[7]);
   mountainRange3.waypoints.push(waypoints[8]);
   const mountainRange4 = new MountainRange();
   mountainRange4.name = 'Beskid Mały';
   mountainRange4.waypoints = [];
   mountainRange4.waypoints.push(waypoints[9]);
   mountainRange4.waypoints.push(waypoints[10]);
   mountainRange4.waypoints.push(waypoints[11]);

   const mountainRanges = [
      mountainRange1,
      mountainRange2,
      mountainRange3,
      mountainRange4,
   ];
   return await mountainRangeRepository.save(mountainRanges);
}

async function seedMountainGroups(
   mountainRanges: MountainRange[],
   mountainGroupRepository,
) {
   const mountainGroup1 = new MountainGroup();
   mountainGroup1.name = 'Tatry i Podtatrze';
   mountainGroup1.mountainRanges = [];
   mountainGroup1.mountainRanges.push(mountainRanges[0]);
   mountainGroup1.mountainRanges.push(mountainRanges[1]);
   const mountainGroup2 = new MountainGroup();
   mountainGroup2.name = 'Beskidy Zachodnie';
   mountainGroup2.mountainRanges = [];
   mountainGroup2.mountainRanges.push(mountainRanges[2]);
   mountainGroup2.mountainRanges.push(mountainRanges[3]);
   return await mountainGroupRepository.save([mountainGroup1, mountainGroup2]);
}

async function seedUsers(
   badges: Badge[],
   mountainGroups: MountainGroup[],
   userRepository,
   touristRepository,
   leaderRepository,
   adminRepository,
) {
   const userAdmin = new User();
   userAdmin.identityNumber = '00123435131';
   userAdmin.login = 'admin';
   userAdmin.name = 'Jan';
   userAdmin.surname = 'Kowalski';
   userAdmin.passwordHash = randomUUID();
   const userTourist1 = new User();
   userTourist1.identityNumber = '00123435132';
   userTourist1.login = 'kaminski';
   userTourist1.name = 'Klaudiusz';
   userTourist1.surname = 'Kamiński';
   userTourist1.passwordHash = randomUUID();
   const userTourist2 = new User();
   userTourist2.identityNumber = '00123435133';
   userTourist2.login = 'szulc';
   userTourist2.name = 'Ludwik';
   userTourist2.surname = 'Szulc';
   userTourist2.passwordHash = randomUUID();
   const userLeader1 = new User();
   userLeader1.identityNumber = '00123435134';
   userLeader1.login = 'ostrowski';
   userLeader1.name = 'Korneliusz';
   userLeader1.surname = 'Ostrowski';
   userLeader1.passwordHash = randomUUID();
   const userLeader2 = new User();
   userLeader2.identityNumber = '00123435135';
   userLeader2.login = 'sadowski';
   userLeader2.name = 'Piotr';
   userLeader2.surname = 'Sadowski';
   userLeader2.passwordHash = randomUUID();

   const users = await userRepository.save([
      userAdmin,
      userLeader1,
      userLeader2,
      userTourist1,
      userTourist2,
   ]);

   const admin = new Admin();
   admin.user = users[0];

   await adminRepository.save(admin);

   const tourist1 = new Tourist();
   tourist1.book = new PTTKBook();
   tourist1.isDisabled = false;
   tourist1.user = users[3];
   tourist1.badges = [];
   tourist1.badges.push(badges[4]);

   const tourist2 = new Tourist();
   tourist2.book = new PTTKBook();
   tourist2.isDisabled = true;
   tourist2.user = users[4];
   tourist2.badges = [];
   tourist2.badges.push(badges[3]);

   const leaderTourist1 = new Tourist();
   leaderTourist1.book = new PTTKBook();
   leaderTourist1.badges = [];
   leaderTourist1.badges.push(badges[0]);
   leaderTourist1.badges.push(badges[1]);
   leaderTourist1.user = users[1];
   leaderTourist1.isDisabled = false;

   const leaderTourist2 = new Tourist();
   leaderTourist2.book = new PTTKBook();
   leaderTourist2.badges = [];
   leaderTourist2.badges.push(badges[2]);
   leaderTourist2.user = users[2];
   leaderTourist2.isDisabled = false;

   const tourists = await touristRepository.save([
      tourist1,
      tourist2,
      leaderTourist1,
      leaderTourist2,
   ]);

   const legitimation1 = new LeaderLegitimation();
   legitimation1.mountainGroups = [mountainGroups[0]];
   const legitimation2 = new LeaderLegitimation();
   legitimation2.mountainGroups = [mountainGroups[0], mountainGroups[1]];

   const leader1 = new Leader();
   leader1.legitimation = legitimation1;
   leader1.nominateDate = new Date(Date.now());
   leader1.tourist = tourists[2];
   const leader2 = new Leader();
   leader2.legitimation = legitimation2;
   leader2.nominateDate = new Date(Date.now());
   leader2.tourist = tourists[3];

   const leaders = [leader1, leader2];

   await leaderRepository.save(leaders);

   return { users, admin, tourists, leaders };
}

async function seedApplicationTypes(applicationTypeRepository) {
   const applicationType = new ApplicationType();
   applicationType.type = 'Grant';
   const applicationTypeExtend = new ApplicationType();
   applicationTypeExtend.type = 'Extend';
   return applicationTypeRepository.save([
      applicationType,
      applicationTypeExtend,
   ]);
}

async function seedApplications(
   types: ApplicationType[],
   tourists: Tourist[],
   leaders: Leader[],
   mountainGroups: MountainGroup[],
   applicationsRepository,
) {
   const application1 = new Application();
   application1.applicant = tourists[0];
   application1.body = 'Test application';
   application1.requestedMountainGroups = [mountainGroups[0]];
   application1.status = ApplicationStatus.Created;
   application1.type = types[0];
   const application1Declined = new Application();
   application1Declined.applicant = tourists[0];
   application1Declined.body = 'Test application';
   application1Declined.requestedMountainGroups = [mountainGroups[0]];
   application1Declined.status = ApplicationStatus.Declined;
   application1Declined.type = types[0];
   const application2Extend = new Application();
   application2Extend.applicant = leaders[0].tourist;
   application2Extend.body = 'Test application Extend';
   application2Extend.requestedMountainGroups = [mountainGroups[1]];
   application2Extend.status = ApplicationStatus.Created;
   application2Extend.type = types[1];
   return applicationsRepository.save([
      application1,
      application1Declined,
      application2Extend,
   ]);
}

/**
 *
 * @param connection Connection to use for seeding database
 * @returns
 * ```
 * Users: [
 *    user1: admin
 *    user2: leader - legitimation contains 1 group, have badge and ongoing badge
 *    user3: leader - legitimation contains 2 groups
 *    user4: tourist
 *    user5: tourist - is disabled
 * ],
 * mountainGroups: [
 *    group1: contains 2 ranges
 *    group2: contains 2 ranges
 * ],
 * mountainRanges: [
 *    range1:
 *    range2:
 *    range3:
 *    range4:
 * ],
 * waypoints: [
 *    12 waypoints 3 for each moutain range
 * ],
 * badges: [
 *    badge1:
 *    badge2: with receive date
 *    badge3:
 *    badge4:
 *    badge5:
 * ],
 * applicationTypes: [
 *    type1: Grant
 *    type2: Extend
 * ],
 * applications: [
 *    application1:
 *    application2: declined
 *    application3: leader
 * ]
 * ```
 */
export async function seedDatabase(connection: Connection): Promise<SeedDatabaseResponse> {
   const badges = await seedBadges(
      connection.getRepository(BadgeType),
      connection.getRepository(BadgeLevel),
      connection.getRepository(Badge),
   );
   const waypoints = await seedWaypoints(connection.getRepository(Waypoint));
   const mountainRanges = await seedMountainRanges(
      waypoints,
      connection.getRepository(MountainRange),
   );
   const mountainGroups = await seedMountainGroups(
      mountainRanges,
      connection.getRepository(MountainGroup),
   );
   const users = await seedUsers(
      badges,
      mountainGroups,
      connection.getRepository(User),
      connection.getRepository(Tourist),
      connection.getRepository(Leader),
      connection.getRepository(Admin),
   );
   const types = await seedApplicationTypes(
      connection.getRepository(ApplicationType),
   );
   const applications = await seedApplications(
      types,
      users.tourists,
      users.leaders,
      mountainGroups,
      connection.getRepository(Application),
   );
   return { users, mountainGroups, mountainRanges, waypoints, badges, types, applications } as SeedDatabaseResponse;
}

export class SeedDatabaseResponse {
   users: {
      users: User[],
      admin: Admin,
      leaders: Leader[],
      tourists: Tourist[]
   }
   mountainGroups: MountainGroup[]
   mountainRanges: MountainRange[]
   waypoints: Waypoint[]
   badges: Badge[]
   types: ApplicationType[]
   applications: Application[]
}