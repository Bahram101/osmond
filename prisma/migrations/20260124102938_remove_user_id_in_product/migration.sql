/*
  Warnings:

  - You are about to drop the column `user_id` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_user_id_fkey";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "user_id";
