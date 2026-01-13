/*
  Warnings:

  - You are about to drop the column `name` on the `category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "category_name_key";

-- AlterTable
ALTER TABLE "category" DROP COLUMN "name",
ADD COLUMN     "title" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "category_title_key" ON "category"("title");
