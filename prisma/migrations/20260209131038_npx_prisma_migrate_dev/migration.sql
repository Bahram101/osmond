/*
  Warnings:

  - Made the column `totalAmount` on table `visit` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "visit" ALTER COLUMN "totalAmount" SET NOT NULL,
ALTER COLUMN "totalAmount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "visit_item" ADD COLUMN     "servicePrice" DECIMAL(10,2);
