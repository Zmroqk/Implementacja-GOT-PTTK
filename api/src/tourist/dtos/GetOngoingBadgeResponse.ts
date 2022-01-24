import { ApiProperty } from "@nestjs/swagger";
import { Badge } from "src/Entities/Badge.entity";

export class GetOngoingBadgeResponse {
   @ApiProperty()
   badge: Badge
   @ApiProperty()
   points: number
   @ApiProperty()
   mountainRangesCount: number
   @ApiProperty()
   inPolandRatio: number
}