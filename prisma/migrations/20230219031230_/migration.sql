/*
  Warnings:

  - You are about to drop the `DeliveryDriver` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DeliveryDriver" DROP CONSTRAINT "DeliveryDriver_userId_fkey";

-- DropTable
DROP TABLE "DeliveryDriver";

-- CreateTable
CREATE TABLE "DeliveryOrder" (
    "address" TEXT NOT NULL,
    "items" TEXT[],
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "timeframe" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,

    CONSTRAINT "DeliveryOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryOrder_userId_key" ON "DeliveryOrder"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryOrder_driverId_key" ON "DeliveryOrder"("driverId");

-- AddForeignKey
ALTER TABLE "DeliveryOrder" ADD CONSTRAINT "DeliveryOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryOrder" ADD CONSTRAINT "DeliveryOrder_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
