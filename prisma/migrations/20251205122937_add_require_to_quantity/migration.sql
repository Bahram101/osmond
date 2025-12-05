/*
  Warnings:

  - Made the column `quantity` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "product" ALTER COLUMN "quantity" SET NOT NULL;
