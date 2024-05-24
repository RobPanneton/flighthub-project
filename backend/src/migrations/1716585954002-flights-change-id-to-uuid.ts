import { MigrationInterface, QueryRunner } from "typeorm";

export class FlightsChangeIdToUuid1716585954002 implements MigrationInterface {
    name = 'FlightsChangeIdToUuid1716585954002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "PK_c614ef3382fdd70b6d6c2c8d8dd"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "flights" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "PK_c614ef3382fdd70b6d6c2c8d8dd" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "PK_c614ef3382fdd70b6d6c2c8d8dd"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "flights" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "PK_c614ef3382fdd70b6d6c2c8d8dd" PRIMARY KEY ("id")`);
    }

}
