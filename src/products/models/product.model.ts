import {
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { DataTypes, UUIDV4 } from 'sequelize';
import { Category } from '../../categories/models/categories.model';

@Table({ timestamps: true })
export class Product extends Model {

  @Column({ primaryKey: true, type: DataTypes.UUID, defaultValue: UUIDV4 })
  public id: string;

  @Column({ type: DataTypes.STRING, allowNull: false, validate: { len: [1, 200] } })
  public title: string;

  @Column({ type: DataTypes.STRING, allowNull: true, validate: { len: [0, 500] } })
  public description: string;

  @ForeignKey(() => Category)
  @Column
  public category_id: string;

  @CreatedAt
  public created_at: Date;

  @UpdatedAt
  public updated_at: Date;

}
