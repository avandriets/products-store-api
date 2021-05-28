import {
  Table,
} from 'sequelize-typescript';
import { BaseHeaderOrder } from '../base/base.header.order';

@Table({ timestamps: true })
export class IncomingOrder extends BaseHeaderOrder {
}
