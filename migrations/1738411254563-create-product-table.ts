import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductTable1738411254563 implements MigrationInterface {
    name = 'CreateProductTable1738411254563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "products" 
        ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "name" character varying(255) NOT NULL, 
        "description" text,
        "quantity" integer NOT NULL, 
        "price" numeric(10,2) NOT NULL, 
        "image_url" text NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "deleted_at" TIMESTAMP WITH TIME ZONE, 
        CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
