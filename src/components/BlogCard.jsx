// src/components/BlogCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <Link to={`/blogs/${blog.id}`} className="text-decoration-none text-dark">
      <div className="card h-100 shadow-sm border-0">
        <img
          src={blog.image || "https://via.placeholder.com/400x200.png?text=Blog+Image"}
          alt={blog.title}
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{blog.title}</h5>
          <p className="card-text text-muted mb-1">Author: {blog.author || 'Anonymous'}</p>
          <p className="card-text text-muted mb-2">Category: {blog.category || 'N/A'}</p>
          <p className="card-text">{(blog.content || '').slice(0, 100)}...</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
