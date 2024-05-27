import { MigrationInterface, QueryRunner } from "typeorm";

export class FlightsAddDatesForTimes1716786867880 implements MigrationInterface {
    name = 'FlightsAddDatesForTimes1716786867880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "departure_time"`);
        await queryRunner.query(`ALTER TABLE "flights" ADD "departure_time" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "arrival_time"`);
        await queryRunner.query(`ALTER TABLE "flights" ADD "arrival_time" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "arrival_time"`);
        await queryRunner.query(`ALTER TABLE "flights" ADD "arrival_time" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "departure_time"`);
        await queryRunner.query(`ALTER TABLE "flights" ADD "departure_time" character varying NOT NULL`);
    }

}
