import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventsModule } from '../events/events.module';
import { IncomingOrder } from './models/orders/incoming.order';
import { IncomingTableOrder } from './models/orders/incoming.table.order';

@Module({
  imports: [
    SequelizeModule.forFeature([
      IncomingOrder,
      IncomingTableOrder,
    ]),
    EventsModule,
  ],
  providers: [
  ],
  controllers: [
  ],
  exports: [
    SequelizeModule,
  ],
})
export class DocumentsModule {
}
