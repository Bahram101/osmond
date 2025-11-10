-- CreateTable
CREATE TABLE "arrival" (
    "id" SERIAL NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryId" TEXT,

    CONSTRAINT "arrival_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "arrival" ADD CONSTRAINT "arrival_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arrival" ADD CONSTRAINT "arrival_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
