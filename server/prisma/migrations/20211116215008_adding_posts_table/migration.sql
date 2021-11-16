-- CreateTable
CREATE TABLE "posts" (
    "post_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "post_title" VARCHAR(255) NOT NULL,
    "post_author_id" UUID NOT NULL,
    "post_content" VARCHAR(255) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("post_id")
);

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_post_author_id_fkey" FOREIGN KEY ("post_author_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
