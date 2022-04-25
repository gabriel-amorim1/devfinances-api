import { MigrationInterface, QueryRunner } from 'typeorm';

export class FinancialTransactionTable1650907399700
    implements MigrationInterface
{
    name = 'FinancialTransactionTable1650907399700';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "financial-transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "amount" numeric NOT NULL, "date" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ff2f8ae5c38543d3b29b961ce66" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "financial-transactions"`);
    }
}
