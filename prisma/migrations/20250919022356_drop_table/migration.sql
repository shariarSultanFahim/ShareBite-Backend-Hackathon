-- CreateTable
CREATE TABLE "public"."Drop" (
    "id" SERIAL NOT NULL,
    "drop_type" TEXT NOT NULL,
    "images" TEXT[],
    "description" TEXT,
    "assumed_person_for" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "donor_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "accepted_by" INTEGER,
    "assigned_rider" INTEGER,
    "rejected_by" INTEGER,

    CONSTRAINT "Drop_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Drop" ADD CONSTRAINT "Drop_donor_id_fkey" FOREIGN KEY ("donor_id") REFERENCES "public"."Donor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Drop" ADD CONSTRAINT "Drop_accepted_by_fkey" FOREIGN KEY ("accepted_by") REFERENCES "public"."Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Drop" ADD CONSTRAINT "Drop_assigned_rider_fkey" FOREIGN KEY ("assigned_rider") REFERENCES "public"."Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Drop" ADD CONSTRAINT "Drop_rejected_by_fkey" FOREIGN KEY ("rejected_by") REFERENCES "public"."Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
