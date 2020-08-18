import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Product])
  ],
  providers: [
    ProductsService,
  ],
  controllers: [
    ProductsController,
  ],
  exports: [
    SequelizeModule,
  ],
})
export class ProductsModule {
}
