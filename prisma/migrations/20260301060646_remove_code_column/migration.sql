/*
  Warnings:

  - You are about to drop the column `code` on the `product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "product_code_key";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "code";
