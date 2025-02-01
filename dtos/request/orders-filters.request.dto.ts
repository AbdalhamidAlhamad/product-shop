import { OrderStatus } from "../../enums";
import { PageOptionsRequestDto } from "./page-options.request.dto";

export class OrdersFiltersRequestDto extends PageOptionsRequestDto {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  orderDate?: Date;
  status?: OrderStatus;
}
