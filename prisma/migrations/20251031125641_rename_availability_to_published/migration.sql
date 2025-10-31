/*
  Warnings:

  - You are about to drop the column `availability` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product" RENAME COLUMN "availability" TO "published";
