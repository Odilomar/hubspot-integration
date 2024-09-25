import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HubspotModule } from './modules/hubspot/hubspot.module';

@Module({
  imports: [HubspotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
