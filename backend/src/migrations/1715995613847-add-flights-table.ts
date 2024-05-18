import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFlightsTable1715995613847 implements MigrationInterface {
    name = 'AddFlightsTable1715995613847'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "flights" ("id" SERIAL NOT NULL, "airline" character varying NOT NULL, "number" character varying NOT NULL, "departure_airport" character varying NOT NULL, "departure_time" character varying NOT NULL, "arrival_airport" character varying NOT NULL, "arrival_time" character varying NOT NULL, "price" numeric NOT NULL, CONSTRAINT "PK_c614ef3382fdd70b6d6c2c8d8dd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "flights"`);
    }

}
