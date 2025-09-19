/*
  Warnings:

  - The `drop_type` column on the `Drop` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Drop` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."DropType" AS ENUM ('Food', 'Medicine', 'Cloth');

-- CreateEnum
CREATE TYPE "public"."DropStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'PICKED', 'DELIVERED', 'CANCELLED');

-- AlterTable
ALTER TABLE "public"."Drop" DROP COLUMN "drop_type",
ADD COLUMN     "drop_type" "public"."DropType" NOT NULL DEFAULT 'Food',
ALTER COLUMN "images" DROP NOT NULL,
ALTER COLUMN "images" SET DATA TYPE TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."DropStatus" NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "public"."Hub" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hub_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Hub_Inventory" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "person_for" INTEGER NOT NULL,
    "remarks" TEXT,
    "reference_id" INTEGER NOT NULL,
    "hub_id" INTEGER NOT NULL,
    "is_transferred" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Hub_Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hub_name_key" ON "public"."Hub"("name");

-- AddForeignKey
ALTER TABLE "public"."Hub_Inventory" ADD CONSTRAINT "Hub_Inventory_hub_id_fkey" FOREIGN KEY ("hub_id") REFERENCES "public"."Hub"("id") ON DELETE CASCADE ON UPDATE CASCADE;
