import Background2 from "@/components/Bg2";
import Navbar from "@/components/Navbar";
import BlogCard from "@/components/blogCard";
export default function Dashboard() {
  return (
    <div>
      <Background2 />

      <Navbar />

      <div className="xl:mt-52 xl:mb-12">
        <BlogCard
          id="1"
          title="New Post"
          author="@ankit_kashyap"
          des="New Blog post on the tech that how tech is evolving"
        />
      </div>
    </div>
  );
}
