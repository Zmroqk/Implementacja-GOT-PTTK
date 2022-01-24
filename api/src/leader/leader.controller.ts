import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LeaderService } from "./leader.service";

@ApiTags('Leader')
@Controller('leader')
export class LeaderController {
   constructor(private leaderService: LeaderService) {}

   @Get()
   async getAllLeaders() {
      return await this.leaderService.getAllLeaders()
   }
}