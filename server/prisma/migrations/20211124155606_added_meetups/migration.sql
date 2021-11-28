-- CreateTable
CREATE TABLE "meetups" (
    "meetup_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_invited" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meetup_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meetup_time" TIMESTAMP(3) NOT NULL,
    "meetup_address" VARCHAR(255) NOT NULL,
    "meetup_place" VARCHAR(255) NOT NULL,

    CONSTRAINT "meetups_pkey" PRIMARY KEY ("meetup_id")
);

-- AddForeignKey
ALTER TABLE "meetups" ADD CONSTRAINT "meetups_meetup_id_fkey" FOREIGN KEY ("meetup_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
