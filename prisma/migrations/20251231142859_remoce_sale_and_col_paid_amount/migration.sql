/*
  Warnings:

  - You are about to drop the column `paidAmount` on the `visit_item` table. All the data in the column will be lost.
  - You are about to drop the `sale` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sale" DROP CONSTRAINT "sale_productId_fkey";

-- AlterTable
ALTER TABLE "visit_item" DROP COLUMN "paidAmount";

-- DropTable
DROP TABLE "sale";
