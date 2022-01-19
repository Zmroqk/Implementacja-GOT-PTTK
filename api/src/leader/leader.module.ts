import { Module } from '@nestjs/common';
import { LeaderService } from './leader.service';

@Module({
  providers: [LeaderService],
  exports: [LeaderService]
})
export class LeaderModule {}
