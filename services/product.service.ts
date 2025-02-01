import ErrorHandler from "../utils/errorHandler";
import AppDataSource from "../data-source";
import {
  CreateProductRequestDto,
  PageOptionsRequestDto,
} from "../dtos/request";
import { Product } from "../entites";

export class ProductService {
  public static createProduct(
    createProductRequestDto: CreateProductRequestDto
  ) {
    const productRepository = AppDataSource.getRepository(Product);

    return productRepository.save(
      productRepository.create(createProductRequestDto)
    );
  }

  public static getProducts({ page, limit }: PageOptionsRequestDto) {
    const productRepository = AppDataSource.getRepository(Product);

    return productRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  public static async getProductById(id: string) {
    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOne({ where: { id } });

    if (!product) {
      throw new ErrorHandler("Product not found", 400);
    }

    return product;
  }

  public static async updateProduct(id: string, product: Partial<Product>) {
    const productRepository = AppDataSource.getRepository(Product);

    const { affected } = await productRepository.update(id, product);

    if (!affected) {
      throw new ErrorHandler("Product not found", 400);
    }

    return this.getProductById(id);
  }

  public static async deleteProduct(id: string) {
    const productRepository = AppDataSource.getRepository(Product);

    const { affected } = await productRepository.softDelete(id);

    if (!affected) {
      throw new ErrorHandler("Product not found", 400);
    }
  }
}
