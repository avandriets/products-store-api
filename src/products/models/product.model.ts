import { Column, CreatedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { UUIDV4 } from 'sequelize';

@Table({ timestamps: true, modelName: 'products' })
export class Product extends Model<Product> {
  @Column({ primaryKey: true, type: DataTypes.UUID, defaultValue: UUIDV4 })
  id: string;

  @Column({ type: DataTypes.STRING, allowNull: false, validate: { len: [1, 200] } })
  title: string;

  @Column({ type: DataTypes.STRING, allowNull: true, validate: { len: [0, 500] } })
  description: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
