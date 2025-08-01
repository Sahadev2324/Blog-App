// src/pages/BlogDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3001/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => {
        console.error('Blog not found', err);
        setBlog(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleLike = () => {
    setLikes((prev) => prev + 1);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  const handleAddComment = () => {
    if (commentInput.trim() !== '') {
      setComments([...comments, commentInput.trim()]);
      setCommentInput('');
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="spinner-border text-primary" role="status" />
        <span className="ms-3">Loading blog...</span>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mt-5 text-center">
        <h4 className="text-danger">Oops! Blog not found.</h4>
        <Link to="/" className="btn btn-outline-primary mt-3">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container mt-5 fade-in">
      <Link to="/" className="btn btn-outline-secondary mb-4">← Back to Home</Link>

      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="img-fluid rounded shadow-sm mb-4"
          style={{ maxHeight: '450px', objectFit: 'cover', width: '100%' }}
        />
      )}

      <h2 className="fw-bold mb-2">{blog.title}</h2>

      <div className="d-flex align-items-center mb-3">
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${blog.author || 'User'}`}
          alt="avatar"
          style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
        />
        <small className="text-muted">
          <strong>{blog.author || 'Unknown'}</strong> • {blog.category || 'General'} • {blog.date || 'N/A'}
        </small>
      </div>

      <div className="d-flex gap-2 mb-3">
        <button className="btn btn-outline-primary btn-sm" onClick={handleLike}>
          👍 Like ({likes})
        </button>
        <button className="btn btn-outline-secondary btn-sm" onClick={handleShare}>
          🔗 Share
        </button>
      </div>

      <hr />

      <p
        className="mt-4"
        style={{
          whiteSpace: 'pre-wrap',
          lineHeight: '1.8',
          fontSize: '1.1rem',
        }}
      >
        {blog.content}
      </p>

      <hr className="my-5" />

      {/* Comment Section */}
      <div>
        <h5 className="mb-3">💬 Comments</h5>

        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Add a comment..."
            rows="3"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button className="btn btn-sm btn-success mt-2" onClick={handleAddComment}>
            Post Comment
          </button>
        </div>

        {comments.length > 0 ? (
          <ul className="list-group">
            {comments.map((cmt, idx) => (
              <li className="list-group-item" key={idx}>{cmt}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
