function BlogCard({ blog }) {
  return (
    <div className="card">
      <h3>{blog.title}</h3>
      <p>{blog.content}</p>
    </div>
  );
}

export default BlogCard;