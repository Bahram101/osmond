/*
  Warnings:

  - Made the column `code` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "product" ALTER COLUMN "code" SET NOT NULL;
