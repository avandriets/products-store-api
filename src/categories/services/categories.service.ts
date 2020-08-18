import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindAndCountOptions } from 'sequelize';
import { Category } from '../models/categories.model';
import { CategoryInterface } from '../interfaces';
import { removeFalsyValues } from '../../utils';

@Injectable()
export class CategoriesService {

  public constructor(
    @InjectModel(Category)
    private categoryModel: typeof Category,
  ) {
  }

  public async geCategories(queryParam: FindAndCountOptions): Promise<{ rows: Category[]; count: number }> {

    return this.categoryModel.findAndCountAll(queryParam);
  }

  public async getCategoryById(categoryId: string): Promise<Category> {

    const category = await this.categoryModel.findByPk(categoryId);

    if (!category) {
      throw new NotFoundException('Could not find a category');
    }

    return category;
  }

  public async deleteCategoryById(categoryId: string): Promise<{ message: string }> {

    const category = await this.categoryModel.findByPk(categoryId);

    if (!category) {
      throw new NotFoundException('Could not find a product');
    }

    await category.destroy();

    return { message: `Product id=${categoryId} was successfully deleted.` };
  }

  public async createCategory(payload: CategoryInterface): Promise<Category> {

    try {
      const category = await this.categoryModel.create(payload);

      return category;
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      throw err.statusCode !== 500 ? new BadRequestException(err) : new BadGatewayException();
    }

  }

  public async updateCategory(categoryId: string, payload: CategoryInterface): Promise<Category> {

    try {
      const category = await this.categoryModel.findByPk(categoryId);

      if (!category) {
        throw new NotFoundException('Could not find a category');
      }

      category.set(removeFalsyValues({ ...payload }));
      await category.save();
      await category.reload();

      return category;
    } catch (err) {

      if (!err.statusCode) {
        err.statusCode = 500;
      }

      throw err.statusCode !== 500 ? new BadRequestException(err) : new BadGatewayException();
    }

  }

}
