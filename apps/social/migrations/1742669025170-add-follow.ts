import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFollow1742669025170 implements MigrationInterface {
    name = 'AddFollow1742669025170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "follow_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "followerId" character varying NOT NULL, "followeeId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isMutual" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_18966373213f8c51750c227943b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "follow_entity"`);
    }

}
