import { useState } from "react";
import BlogCard from "../components/BlogCard";

function Home() {
  const [blogs] = useState([
    { id: 1, title: "First Blog", content: "Welcome to blog app!" },
    { id: 2, title: "Second Blog", content: "React is awesome!" },
  ]);

  return (
    <div>
      <h1>All Blogs</h1>

      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default Home;