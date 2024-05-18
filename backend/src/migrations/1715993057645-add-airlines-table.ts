import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAirlinesTable1715993057645 implements MigrationInterface {
    name = 'AddAirlinesTable1715993057645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "airlines" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_74f50545f40719d6a763da9da47" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "airlines"`);
    }

}
