import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrderTable1738421367131 implements MigrationInterface {
  name = "CreateOrderTable1738421367131";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "orders" 
      ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "customer_name" character varying(255) NOT NULL, 
      "customer_email" character varying(255) NOT NULL, 
      "customer_phone" character varying(255) NOT NULL, 
      "order_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
      "shipping_address" text NOT NULL, 
      "total_price" numeric(10,2) NOT NULL, 
      "status" character varying(255) NOT NULL DEFAULT 'PENDING', 
      "product_id" uuid NOT NULL, 
      "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
      "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
       CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_ac832121b6c331b084ecc4121fd" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_ac832121b6c331b084ecc4121fd"`
    );
    await queryRunner.query(`DROP TABLE "orders"`);
  }
}
