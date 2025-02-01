import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255, name: "name" })
  name!: string;

  @Column({ type: "text", name: "description", nullable: true })
  description!: string | null;

  @Column({ type: "integer", name: "quantity" })
  quantity!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, name: "price" })
  price!: number;

  @Column({ type: "text", name: "image_url"})
  imageUrl!: string;

  @CreateDateColumn({ type: "timestamp with time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone", name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ type: "timestamp with time zone", name: "deleted_at" })
  deletedAt!: Date;
}
