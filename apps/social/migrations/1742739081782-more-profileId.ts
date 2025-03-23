import { MigrationInterface, QueryRunner } from "typeorm";

export class MoreProfileId1742739081782 implements MigrationInterface {
    name = 'MoreProfileId1742739081782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ADD "profileId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vote" ADD "profileId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP COLUMN "profileId"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "profileId"`);
    }

}
