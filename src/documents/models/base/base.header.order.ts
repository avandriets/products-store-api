import { Column, CreatedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { DataTypes, UUIDV4 } from 'sequelize';

@Table({ timestamps: true })
export class BaseHeaderOrder extends Model {

  @Column({ primaryKey: true, type: DataTypes.UUID, defaultValue: UUIDV4 })
  public id: string;

  @Column({ type: DataTypes.STRING, allowNull: false, validate: { len: [1, 200] } })
  public doc_type: string;

  @CreatedAt
  public created_at: Date;

  @UpdatedAt
  public updated_at: Date;

}
