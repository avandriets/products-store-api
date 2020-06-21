import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './products/models/product.model';

@Module({
  imports: [
    ProductsModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USER || 'store',
      password: process.env.DB_PASSWORD || 'store',
      database: process.env.DATABASE || 'store',
      ssl: process.env.DB_SSL === 'true',
      models: [
        Product,
      ],
    }),
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {
}
