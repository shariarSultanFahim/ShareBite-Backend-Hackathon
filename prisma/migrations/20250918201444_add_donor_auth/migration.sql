-- CreateTable
CREATE TABLE "public"."Donor" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "avatar" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "passhash" TEXT NOT NULL DEFAULT '',
    "passphrase" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Donor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DonorSession" (
    "id" SERIAL NOT NULL,
    "donor_id" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "expired_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DonorSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Donor_username_key" ON "public"."Donor"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Donor_email_key" ON "public"."Donor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Donor_phone_key" ON "public"."Donor"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "DonorSession_token_key" ON "public"."DonorSession"("token");

-- AddForeignKey
ALTER TABLE "public"."DonorSession" ADD CONSTRAINT "DonorSession_donor_id_fkey" FOREIGN KEY ("donor_id") REFERENCES "public"."Donor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
