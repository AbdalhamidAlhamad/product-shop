import { Product } from "../../entites";

export class ProductResponseDto {
  id: string;
  name: string;
  description: string | null;
  price: number;
  quantity: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.quantity = product.quantity;
    this.imageUrl = product.imageUrl;
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;
  }
}
