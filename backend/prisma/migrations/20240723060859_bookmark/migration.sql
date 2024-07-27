-- DropForeignKey
ALTER TABLE "BookMark" DROP CONSTRAINT "BookMark_postId_fkey";

-- DropForeignKey
ALTER TABLE "BookMark" DROP CONSTRAINT "BookMark_userId_fkey";

-- AddForeignKey
ALTER TABLE "BookMark" ADD CONSTRAINT "BookMark_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookMark" ADD CONSTRAINT "BookMark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
