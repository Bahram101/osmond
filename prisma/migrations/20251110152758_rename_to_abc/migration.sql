/*
  Warnings:

  - You are about to drop the column `barcode2` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "barcode2",
ADD COLUMN     "abc" TEXT;
