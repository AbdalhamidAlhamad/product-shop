import { OrderStatus } from "../enums";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "./product.entity";

@Entity("orders")
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255, name: "customer_name" })
  customerName!: string;

  @Column({ type: "varchar", length: 255, name: "customer_email" })
  customerEmail!: string;

  @Column({ type: "varchar", length: 255, name: "customer_phone" })
  customerPhone!: string;

  @Column({ type: "timestamp with time zone", name: "order_date" , default: () => "CURRENT_TIMESTAMP"})
  orderDate!: Date;

  @Column({ type: "text", name: "shipping_address" })
  shippingAddress!: string;

  @Column({ type: "decimal", precision: 10, scale: 2, name: "total_price" })
  totalPrice!: number;

  @Column({ type: "varchar", length: 255, name: "status" , default: OrderStatus.PENDING})
  status!: OrderStatus;

  @Column({ type: "uuid", name: "product_id" })
  productId!: string;

  @ManyToOne(() => Product, (product) => product.orders, { eager: true })
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @CreateDateColumn({ type: "timestamp with time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone", name: "updated_at" })
  updatedAt!: Date;
}
