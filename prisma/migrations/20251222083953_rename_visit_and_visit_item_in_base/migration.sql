/*
  Warnings:

  - You are about to drop the `Visit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VisitItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_clientId_fkey";

-- DropForeignKey
ALTER TABLE "VisitItem" DROP CONSTRAINT "VisitItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "VisitItem" DROP CONSTRAINT "VisitItem_visitId_fkey";

-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_visitId_fkey";

-- DropTable
DROP TABLE "Visit";

-- DropTable
DROP TABLE "VisitItem";

-- CreateTable
CREATE TABLE "visit" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "status" "VisitStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visit_item" (
    "id" SERIAL NOT NULL,
    "visitId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "paidAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "visit_item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "visit" ADD CONSTRAINT "visit_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visit_item" ADD CONSTRAINT "visit_item_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "visit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visit_item" ADD CONSTRAINT "visit_item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "visit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
