import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/product.model';
import { QueryParam } from '../../interfaces';
import { queryParser, removeFalsyValues } from '../../utils';
import { FindAndCountOptions } from 'sequelize/types';
import { ProductInterface } from '../interfaces/product.interface';

@Controller('products')
export class ProductsController {

  public constructor(
    private productsService: ProductsService,
  ) {
  }

  // Example of query
  // http://localhost:3000/products?offset=1&limit=220&sort_field=created_at&sort=desc&q=%7B%20%22title%22%3A%20%7B%20%22%24iLike%22%3A%20%22%25he%25%22%20%7D%20%7D
  // http://localhost:3000/products?offset=1&limit=220&sort_field=created_at&sort=desc&q={ "title": { "$iLike": "%he%" } }
  // simple encode query string if you add param q as json
  @Get()
  public async getProducts(@Query() queryParam: QueryParam): Promise<{ rows: Product[]; count: number }> {
    const { offset, limit, sort_field, sort, q } = queryParam;

    const search = q ? queryParser(JSON.parse(q)) : null;

    const query: FindAndCountOptions = {
      limit: +limit || 5,
      offset: +offset || 0,
      order: sort_field ? [[sort_field, ['asc', 'desc'].includes(sort?.toLowerCase()) ? sort : 'ASC']] : null,
      where: search,
    };

    return this.productsService.getProducts(removeFalsyValues(query));
  }

  @Get(':productId')
  public async getProduct(@Param('productId') productId: string): Promise<Product> {

    return await this.productsService.getProductById(productId);
  }

  @Post()
  public postProduct(@Body() product: ProductInterface): Promise<Product> {

    return this.productsService.createProduct(product);
  }

  @Put(':productId')
  public async putProduct(@Param('productId') productId: string, @Body() product: ProductInterface): Promise<Product> {

    return this.productsService.updateProduct(productId, product);
  }

  @Delete(':productId')
  public deleteProduct(@Param('productId') productId: string): Promise<{ message: string }> {

    return this.productsService.deleteProductById(productId);
  }

}
