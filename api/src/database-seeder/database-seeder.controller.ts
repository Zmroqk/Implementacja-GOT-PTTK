import { Controller, Post } from '@nestjs/common';
import { DatabaseSeederService } from './database-seeder.service';

@Controller('database-seeder')
export class DatabaseSeederController {
   constructor(private databaseSeederService: DatabaseSeederService) {}

   @Post('seed')
   async seedDatabase() {
      this.databaseSeederService.seedDatabase()
   }
}
