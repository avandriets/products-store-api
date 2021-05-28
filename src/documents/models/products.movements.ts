import {
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { DataTypes, UUIDV4 } from 'sequelize';
import { Product } from '../../products/models/product.model';

@Table({ timestamps: true })
export class ProductsMovements extends Model {

  @Column({ primaryKey: true, type: DataTypes.UUID, defaultValue: UUIDV4 })
  public id: string;

  @Column
  public type: string;

  @Column
  public document_id: string;

  @ForeignKey(() => Product)
  @Column
  public product_id: string;

  @Column({ })
  public amount: number;

  @Column({ })
  public price: number;

  @Column({ })
  public sum: number;

  @CreatedAt
  public created_at: Date;

  @UpdatedAt
  public updated_at: Date;

}
