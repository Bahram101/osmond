/*
  Warnings:

  - You are about to drop the column `qty` on the `visit_item` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `visit_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "visit" ADD COLUMN     "totalAmount" DECIMAL(10,2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "visit_item" DROP COLUMN "qty",
ADD COLUMN     "quantity" INTEGER NOT NULL;
