import { OrderStatus } from "../../enums";
import { Order } from "../../entites";
import { ProductResponseDto } from "./product.response.dto";

export class OrderResponseDto {
    id!: string;
    customerName!: string;
    customerEmail!: string;
    customerPhone!: string;
    shippingAddress!: string;
    orderDate!: Date;
    status: OrderStatus;
    product!: ProductResponseDto;
    createdAt!: Date;
    updatedAt!: Date;

    constructor(order: Order) {
        this.id = order.id;
        this.customerName = order.customerName;
        this.customerEmail = order.customerEmail;
        this.customerPhone = order.customerPhone;
        this.shippingAddress = order.shippingAddress;
        this.orderDate = order.orderDate;
        this.status = order.status;
        this.product = new ProductResponseDto(order.product);
        this.createdAt = order.createdAt;
        this.updatedAt = order.updatedAt;
    }

}