/*
  Warnings:

  - You are about to drop the column `costPrice` on the `arrival` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "MovementType" AS ENUM ('IN', 'OUT');

-- AlterTable
ALTER TABLE "arrival" DROP COLUMN "costPrice",
ADD COLUMN     "purchasePrice" DECIMAL(10,2),
ADD COLUMN     "type" "MovementType" NOT NULL DEFAULT 'IN';
