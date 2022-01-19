import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApplicationService } from './application.service';

@Controller('application')
export class ApplicationController {
   constructor(private readonly applicationService: ApplicationService) {}

   @Get()
   async findAll() {
      return this.applicationService.getAllAplications();
   }

   @Post('accept/:id')
   async acceptApplication(@Param('id') id: number) {
      
   }
}
