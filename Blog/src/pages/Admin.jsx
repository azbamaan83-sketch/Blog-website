import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Admin() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (!user) {
    navigate("/login");
    return null;
  }

  const addBlog = () => {
    if (!title || !content) return;

    const newBlog = {
      id: Date.now(),
      title,
      content,
    };

    setBlogs([...blogs, newBlog]);
    setTitle("");
    setContent("");
  };

  const deleteBlog = (id) => {
    setBlogs(blogs.filter((b) => b.id !== id));
  };

  return (
    <div>
      <h1>Admin Panel</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={addBlog}>Add Blog</button>

      <div>
        {blogs.map((blog) => (
          <div key={blog.id} className="card">
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <button onClick={() => deleteBlog(blog.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;