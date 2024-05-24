import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLogoToAirlines1716583473006 implements MigrationInterface {
    name = 'AddLogoToAirlines1716583473006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "airlines" ADD "logo" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "airlines" DROP COLUMN "logo"`);
    }

}
