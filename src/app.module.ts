import { Module } from '@nestjs/common';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { format, transports } from 'winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './products/models/product.model';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/models/categories.model';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ProductsModule,
    CategoriesModule,

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      ssl: process.env.DB_SSL === 'true',
      synchronize: true,
      autoLoadModels: true,
      sync: { alter: true },
      models: [
        Category,
        Product,
      ],
    }),
    WinstonModule.forRoot({
      format: format.combine(
        format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
        // format.simple(),
      ),
      transports: [
        new transports.Console(),
        new transports.File({ filename: `${process.env.VOLUME_PATH || ''}warehouse.log`, maxsize: 300000 }),
      ],
    }),

    EventsModule,

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
