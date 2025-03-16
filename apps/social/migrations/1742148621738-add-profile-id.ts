import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProfileId1742148621738 implements MigrationInterface {
    name = 'AddProfileId1742148621738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "profileId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "profileId"`);
    }

}
