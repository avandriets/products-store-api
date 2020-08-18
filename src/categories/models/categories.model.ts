import { Column, CreatedAt, HasMany, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { UUIDV4 } from 'sequelize';
import { Product } from '../../products/models/product.model';

@Table({ timestamps: true, modelName: 'categories' })
export class Category extends Model<Category> {

  @Column({ primaryKey: true, type: DataTypes.UUID, defaultValue: UUIDV4 })
  id: string;

  @Column({ type: DataTypes.STRING, allowNull: false, validate: { len: [1, 200] } })
  name: string;

  @Column({ type: DataTypes.STRING, allowNull: true, validate: { len: [0, 500] } })
  description: string;

  @HasMany(() => Product)
  products: Product[];

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

}
