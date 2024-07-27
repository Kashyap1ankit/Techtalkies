/*
  Warnings:

  - A unique constraint covering the columns `[postId,userId]` on the table `BookMark` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BookMark_postId_userId_key" ON "BookMark"("postId", "userId");
