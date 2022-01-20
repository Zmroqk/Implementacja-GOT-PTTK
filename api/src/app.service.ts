import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkConnection(): string {
    return 'You connected to GOT PTTK API';
  }
}
