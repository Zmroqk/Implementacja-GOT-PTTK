import {
   Controller,
   Get,
   Param,
   Post,
} from '@nestjs/common';
import { Application } from 'src/Entities/Application.entity';
import { Leader } from 'src/Entities/Leader.entity';
import { ApplicationService } from './application.service';

@Controller('application')
export class ApplicationController {
   constructor(private readonly applicationService: ApplicationService) {}

   @Get()
   async findAll() {
      return this.applicationService.getAllAplications();
   }

   @Post('accept/:id')
   async acceptApplication(@Param('id') id: number): Promise<Leader> {
      return this.applicationService.acceptApplication(id);
   }

   @Post('decline/:id')
   async declineApplication(@Param('id') id: number): Promise<Application> {
      return this.applicationService.declineApplication(id);
   }
}
