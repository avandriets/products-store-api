import {
  Column,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { BaseTableOrder } from '../base/base.table.order';
import { IncomingOrder } from './incoming.order';

@Table({ timestamps: true })
export class IncomingTableOrder extends BaseTableOrder {

  @ForeignKey(() => IncomingOrder)
  @Column
  public document_id: string;

}
