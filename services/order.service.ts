import { Order, Product } from "../entites";
import AppDataSource from "../data-source";
import { CreateOrderRequestDto } from "../dtos/request";
import ErrorHandler from "../utils/errorHandler";
import { OrdersFiltersRequestDto } from "dtos/request/orders-filters.request.dto";
import moment from "moment";
import { OrderStatus } from "enums";
import { ThirdPartyService } from "./third-party.service";
export class OrderService {
  public static async createOrder(
    createOrderRequestDto: CreateOrderRequestDto
  ) {
    return AppDataSource.transaction(async (transactionalEntityManager) => {
      const productRepository =
        transactionalEntityManager.getRepository(Product);
      const product = await productRepository.findOne({
        where: { id: createOrderRequestDto.productId },
        lock: { mode: "pessimistic_write" },
      });

      if (!product) {
        throw new ErrorHandler(
          `Product not found with id: ${createOrderRequestDto.productId}`,
          400
        );
      }

      if (product.quantity < createOrderRequestDto.quantity) {
        throw new ErrorHandler("Not enough product in stock", 400);
      }

      product.quantity -= createOrderRequestDto.quantity;
      await productRepository.save(product);

      // 4) Create & save the order
      const orderRepository = transactionalEntityManager.getRepository(Order);

      const createdOrder = await orderRepository.save(
        orderRepository.create({
          ...createOrderRequestDto,
          totalPrice: product.price * createOrderRequestDto.quantity,
        })
      );

      //@TODO send third party api request to payment gateway
      const order = await orderRepository.findOneOrFail({
        where: { id: createdOrder.id },
      });

      await ThirdPartyService.PostOrder(order);

      return order;
    });
  }

  public static async findOrderById(id: string) {
    const orderRepository = AppDataSource.getRepository(Order);
    const order = await orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new ErrorHandler(`Order not found`, 400);
    }
    return order;
  }

  public static async findOrders(query: OrdersFiltersRequestDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const orderRepository = AppDataSource.getRepository(Order);

    const queryBuilder = orderRepository.createQueryBuilder("order");
    queryBuilder.leftJoinAndSelect("order.product", "product");

    if (query.customerName) {
      queryBuilder.andWhere("order.customerName LIKE :customerName", {
        customerName: `%${query.customerName}%`,
      });
    }

    if (query.customerEmail) {
      queryBuilder.andWhere("order.customerEmail LIKE :customerEmail", {
        customerEmail: `%${query.customerEmail}%`,
      });
    }

    if (query.customerPhone) {
      queryBuilder.andWhere("order.customerPhone LIKE :customerPhone", {
        customerPhone: `%${query.customerPhone}%`,
      });
    }

    if (query.orderDate) {
      const startDate = moment(query.orderDate).startOf("day").toDate();
      const endDate = moment(query.orderDate).endOf("day").toDate();
      queryBuilder.andWhere("order.orderDate BETWEEN :startDate AND :endDate", {
        startDate,
        endDate,
      });
    }

    if (query.status) {
      queryBuilder.andWhere("order.status = :status", {
        status: query.status,
      });
    }

    queryBuilder.skip((page - 1) * limit);
    queryBuilder.take(limit);
    queryBuilder.orderBy("order.createdAt", "DESC");
    return queryBuilder.getManyAndCount();
  }

  public static async updateOrderStatus(id: string, status: OrderStatus) {
    const orderRepository = AppDataSource.getRepository(Order);

    const { affected } = await orderRepository.update({ id }, { status });

    if (!affected) {
      throw new ErrorHandler(`Order not found`, 400);
    }

    return this.findOrderById(id);
  }
}
