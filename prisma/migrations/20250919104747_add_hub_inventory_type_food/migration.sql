/*
  Warnings:

  - The `type` column on the `Hub_Inventory` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."Hub_InventoryType" AS ENUM ('In', 'Out');

-- AlterTable
ALTER TABLE "public"."Hub_Inventory" DROP COLUMN "type",
ADD COLUMN     "type" "public"."Hub_InventoryType" NOT NULL DEFAULT 'In';

-- CreateTable
CREATE TABLE "public"."Dispatch" (
    "id" SERIAL NOT NULL,
    "person_for" INTEGER NOT NULL,
    "remarks" TEXT,
    "dispatched_by" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dispatch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Dispatch" ADD CONSTRAINT "Dispatch_dispatched_by_fkey" FOREIGN KEY ("dispatched_by") REFERENCES "public"."Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
