/*
  Warnings:

  - You are about to drop the column `address` on the `DeliveryOrder` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `DeliveryOrder` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `DeliveryOrder` table. All the data in the column will be lost.
  - Added the required column `personalAddress` to the `DeliveryOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalLatitude` to the `DeliveryOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalLongitude` to the `DeliveryOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupAddress` to the `DeliveryOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupLatitude` to the `DeliveryOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupLongitude` to the `DeliveryOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeliveryOrder" DROP COLUMN "address",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "personalAddress" TEXT NOT NULL,
ADD COLUMN     "personalLatitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "personalLongitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pickupAddress" TEXT NOT NULL,
ADD COLUMN     "pickupLatitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pickupLongitude" DOUBLE PRECISION NOT NULL;
