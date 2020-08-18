import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { QueryParam } from '../../interfaces';
import { Category } from '../models/categories.model';
import { queryParser, removeFalsyValues } from '../../utils';
import { FindAndCountOptions } from 'sequelize';
import { CategoriesService } from '../services/categories.service';
import { CategoryInterface } from '../interfaces';

@Controller('categories')
export class CategoriesController {

  public constructor(
    private categoriesService: CategoriesService,
  ) {
  }

  @Get()
  public async getCategories(@Query() queryParam: QueryParam): Promise<{ rows: Category[]; count: number }> {
    const { offset, limit, sort_field, sort, q } = queryParam;

    const search = q ? queryParser(JSON.parse(q)) : null;

    const query: FindAndCountOptions = {
      limit: +limit || 5,
      offset: +offset || 0,
      order: sort_field ? [[sort_field, ['asc', 'desc'].includes(sort?.toLowerCase()) ? sort : 'ASC']] : null,
      where: search,
    };

    return this.categoriesService.geCategories(removeFalsyValues(query));
  }

  @Get(':categoryId')
  public async getCategory(@Param('categoryId') categoryId: string): Promise<Category> {

    return await this.categoriesService.getCategoryById(categoryId);
  }

  @Post()
  public postCategory(@Body() category: CategoryInterface): Promise<Category> {

    return this.categoriesService.createCategory(category);
  }

  @Put(':categoryId')
  public async putCategory(@Param('categoryId') categoryId: string, @Body() category: CategoryInterface): Promise<Category> {

    return this.categoriesService.updateCategory(categoryId, category);
  }

  @Delete(':categoryId')
  public deleteCategory(@Param('categoryId') categoryId: string): Promise<{ message: string }> {

    return this.categoriesService.deleteCategoryById(categoryId);
  }

}
