/*
  Warnings:

  - Added the required column `note` to the `arrival` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "arrival" ADD COLUMN     "note" TEXT NOT NULL;
