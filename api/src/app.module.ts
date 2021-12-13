import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
     TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env['DB_HOST'],
        port: Number.parseInt(process.env['DB_PORT']),
        username: process.env['DB_USER'],
        password: process.env['DB_PASS'],
        database: process.env['DB_DATABASE'],
        entities: [],
        synchronize: true,
     })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
