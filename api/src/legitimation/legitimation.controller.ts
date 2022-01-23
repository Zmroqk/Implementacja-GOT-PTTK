import { Body, Controller, Patch, Param } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { UpdateLeaderPermissionsDto } from "./dtos/UpdateLeaderPermissions.dto";
import { LegitimationService } from "./legitimation.service";

@ApiTags('Legitimation')
@Controller('legitimation')
export class LegitimationController {
   constructor(private legitimationService: LegitimationService) {}

   @ApiBody({type: [Number]})
   @Patch(':leader_id')
   async updateLeaderPermissions(@Param('leader_id') leaderId: number, @Body() permissions: number[]) {
      return await this.legitimationService.updateLeaderPermissions(leaderId, permissions)
   }
      
}