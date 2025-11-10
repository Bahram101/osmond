/*
  Warnings:

  - You are about to drop the column `categoryId` on the `arrival` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "arrival" DROP CONSTRAINT "arrival_categoryId_fkey";

-- AlterTable
ALTER TABLE "arrival" DROP COLUMN "categoryId";
