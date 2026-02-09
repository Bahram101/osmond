/*
  Warnings:

  - A unique constraint covering the columns `[fullName]` on the table `client` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "client_fullName_key" ON "client"("fullName");
