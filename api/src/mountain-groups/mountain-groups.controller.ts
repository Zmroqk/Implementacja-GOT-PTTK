import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MountainGroup } from "src/Entities/MountainGroup.entity";
import { MountainGroupsService } from "./mountain-groups.service";

@ApiTags('MountainGroup')
@Controller('mountainGroup')
export class MountainGroupController {
   constructor(private mountainGroupService: MountainGroupsService) {}

   @Get()
   async getAllMoutainGroups(): Promise<MountainGroup[]> {
      return await this.mountainGroupService.getAllMountainGroups()
   }
}