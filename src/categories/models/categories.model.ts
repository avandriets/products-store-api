import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { UUIDV4 } from 'sequelize';

@Table({ timestamps: true })
export class Category extends Model<Category> {

  @Column({ primaryKey: true, type: DataTypes.UUID, defaultValue: UUIDV4 })
  public id: string;

  @Column({ type: DataTypes.STRING, allowNull: false, validate: { len: [1, 200] } })
  public name: string;

  @Column({ type: DataTypes.STRING, allowNull: true, validate: { len: [0, 500] } })
  public description: string;

  @CreatedAt
  public created_at: Date;

  @UpdatedAt
  public updated_at: Date;

}
