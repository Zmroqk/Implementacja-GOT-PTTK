import {
   BadRequestException,
   Controller,
   Get,
   NotFoundException,
   Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TouristService } from './tourist.service';

@ApiTags("Tourist")
@Controller()
export class TouristController {
   constructor(private touristService: TouristService) {}

   @Get('badge/:user_id')
   async getBadges(@Param('user_id') user_id: string) {
      const id = Number.parseInt(user_id);
      if (Number.isNaN(id)) {
         throw new BadRequestException(this, 'User id is not a number');
      }
      const badges = await this.touristService.getBadges(id);
      if (badges.length == 0)
         throw new NotFoundException(this, `No badges for user ${id} found`);
      return badges;
   }

   @Get('badge/ongoing/:user_id')
   async getOngoingBadgeProgress(@Param('user_id') user_id: string) {
      const id = Number.parseInt(user_id);
      if (Number.isNaN(id)) {
         throw new BadRequestException(this, 'User id is not a number');
      }
      const response = this.touristService.getOngoingBadge(id);
      if (!response) {
         throw new NotFoundException(
            this,
            `Cannot find current badge for user ${id}`,
         );
      }
      return response;
   }
}
