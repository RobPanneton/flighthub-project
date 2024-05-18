import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAirportsTable1715994561729 implements MigrationInterface {
    name = 'AddAirportsTable1715994561729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "airports" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "city_code" character varying NOT NULL, "name" character varying NOT NULL, "city" character varying NOT NULL, "country_code" character varying NOT NULL, "region_code" character varying NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "timezone" character varying NOT NULL, CONSTRAINT "PK_507127316cedb7ec7447d0cb3d7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "airports"`);
    }

}
