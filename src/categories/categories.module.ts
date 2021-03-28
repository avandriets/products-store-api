import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './models/categories.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Category,
    ]),
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
