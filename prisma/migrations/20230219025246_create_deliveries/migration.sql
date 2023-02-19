/*
  Warnings:

  - Added the required column `Address` to the `DeliveryDriver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Longitude` to the `DeliveryDriver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `DeliveryDriver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeframe` to the `DeliveryDriver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeliveryDriver" ADD COLUMN     "Address" TEXT NOT NULL,
ADD COLUMN     "Longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "items" TEXT[],
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "timeframe" TEXT NOT NULL;
