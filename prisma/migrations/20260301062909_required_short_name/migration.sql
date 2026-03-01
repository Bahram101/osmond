/*
  Warnings:

  - Made the column `shortName` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "product" ALTER COLUMN "shortName" SET NOT NULL;
