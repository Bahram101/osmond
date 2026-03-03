/*
  Warnings:

  - A unique constraint covering the columns `[shortName]` on the table `product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "product_shortName_key" ON "product"("shortName");
