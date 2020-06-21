import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../models/product.model';
import { FindAndCountOptions } from 'sequelize/types';
import { ProductInterface } from '../interfaces/product.interface';
import { removeFalsyValues } from '../../utils';

@Injectable()
export class ProductsService {

  public constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {
  }

  public async getProducts(queryParam: FindAndCountOptions): Promise<{ rows: Product[]; count: number }> {

    return this.productModel.findAndCountAll(queryParam);
  }

  public async getProductById(productId: string): Promise<Product> {

    const product = await this.productModel.findByPk(productId);

    if (!product) {
      throw new NotFoundException('Could not find a product');
    }

    return product;
  }

  public async deleteProductById(productId: string): Promise<{ message: string }> {

    const product = await this.productModel.findByPk(productId);

    if (!product) {
      throw new NotFoundException('Could not find a product');
    }

    await product.destroy();

    return { message: `Product id=${productId} was successfully deleted.` };
  }

  public async createProduct(payload: ProductInterface): Promise<Product> {

    try {
      const product = await this.productModel.create(payload);

      return product;
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      throw err.statusCode !== 500 ? new BadRequestException(err) : new BadGatewayException();
    }

  }

  public async updateProduct(productId: string, payload: ProductInterface): Promise<Product> {

    try {
      const product = await this.productModel.findByPk(productId);

      if (!product) {
        throw new NotFoundException('Could not find a product');
      }

      product.set(removeFalsyValues({ ...payload }));
      await product.save();
      await product.reload();

      return product;
    } catch (err) {

      if (!err.statusCode) {
        err.statusCode = 500;
      }

      throw err.statusCode !== 500 ? new BadRequestException(err) : new BadGatewayException();
    }

  }

}
