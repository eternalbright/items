-- CreateEnum
CREATE TYPE "Category" AS ENUM ('DESSERT', 'DRINK', 'FOOD');

-- CreateEnum
CREATE TYPE "PortionUnit" AS ENUM ('mg', 'ml');

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" VARCHAR(100) NOT NULL,
    "imageUrl" VARCHAR(100) NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "portion" INTEGER NOT NULL,
    "portionUnit" "PortionUnit" NOT NULL,
    "price" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Item_category_idx" ON "Item"("category");
