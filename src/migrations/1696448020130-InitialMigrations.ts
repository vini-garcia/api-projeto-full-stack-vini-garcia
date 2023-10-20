import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigrations1696448020130 implements MigrationInterface {
  name = "InitialMigrations1696448020130";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" text NOT NULL, "created_at" date NOT NULL DEFAULT now(), "userId" uuid, "announcementsId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "gallery_image_url" character varying(250), "cover_image_url" character varying(250), "announcementId" uuid, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "announcements" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "car_brand" character varying(15) NOT NULL, "model_car" character varying(15) NOT NULL, "fipe_price" integer NOT NULL, "price" integer NOT NULL, "year_built" integer NOT NULL, "mileage" integer NOT NULL, "description" text NOT NULL, "color" character varying(15) NOT NULL, "type_of_fuel" character varying(15) NOT NULL, "userId" uuid, CONSTRAINT "PK_b3ad760876ff2e19d58e05dc8b0" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(100) NOT NULL, "cpf" character varying(11) NOT NULL, "phone_number" character varying(11) NOT NULL, "dob" date NOT NULL, "description" text, "password" character varying(128) NOT NULL, "type_of_account" character varying(6) NOT NULL DEFAULT 'buyer', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "Addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "post_code" character varying(8) NOT NULL, "state" character varying(25) NOT NULL, "city" character varying(25) NOT NULL, "street_name" character varying(80) NOT NULL, "street_number" character varying(5) NOT NULL, "address_complement" character varying(50), "userId" uuid, CONSTRAINT "REL_cc5512a08524474323a4fac272" UNIQUE ("userId"), CONSTRAINT "PK_239c81748e5a62ac7223a7350c5" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_470826bd8eeac6a6252a3891717" FOREIGN KEY ("announcementsId") REFERENCES "announcements"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "images" ADD CONSTRAINT "FK_fac6198a89ec23116ca0352104d" FOREIGN KEY ("announcementId") REFERENCES "announcements"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "announcements" ADD CONSTRAINT "FK_1968b95a7c6d64a81b1b3b5aad4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "Addresses" ADD CONSTRAINT "FK_cc5512a08524474323a4fac2728" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Addresses" DROP CONSTRAINT "FK_cc5512a08524474323a4fac2728"`
    );
    await queryRunner.query(
      `ALTER TABLE "announcements" DROP CONSTRAINT "FK_1968b95a7c6d64a81b1b3b5aad4"`
    );
    await queryRunner.query(
      `ALTER TABLE "images" DROP CONSTRAINT "FK_fac6198a89ec23116ca0352104d"`
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_470826bd8eeac6a6252a3891717"`
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`
    );
    await queryRunner.query(`DROP TABLE "Addresses"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "announcements"`);
    await queryRunner.query(`DROP TABLE "images"`);
    await queryRunner.query(`DROP TABLE "comments"`);
  }
}
