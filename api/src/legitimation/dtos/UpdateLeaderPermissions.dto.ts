import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class UpdateLeaderPermissionsDto {
   @ApiProperty()
   @IsArray()
   mountainGroupsIds: number[]
}