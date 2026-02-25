/*
  Warnings:

  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "masterPrice" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "wholesalePrice" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "price" SET DATA TYPE INTEGER;
