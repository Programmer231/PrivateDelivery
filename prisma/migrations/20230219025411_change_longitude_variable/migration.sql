/*
  Warnings:

  - You are about to drop the column `Longitude` on the `DeliveryDriver` table. All the data in the column will be lost.
  - Added the required column `longitude` to the `DeliveryDriver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeliveryDriver" DROP COLUMN "Longitude",
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;
