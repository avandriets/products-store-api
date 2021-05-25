import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './models/categories.model';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Category,
    ]),
    EventsModule,
  ],
  providers: [
    CategoriesService,
  ],
  controllers: [
    CategoriesController,
  ],
  exports: [
    SequelizeModule,
  ],
})
export class CategoriesModule {
}
