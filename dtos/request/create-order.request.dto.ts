export class CreateOrderRequestDto {
  productId!: string;
  quantity!: number;
  customerName!: string;
  customerEmail!: string;
  customerPhone!: string;
  shippingAddress!: string;
}
