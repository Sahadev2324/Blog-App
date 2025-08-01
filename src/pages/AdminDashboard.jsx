import React, { useEffect, useState } from 'react';
import { getBlogs, deleteBlog } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toast as hotToast } from 'react-hot-toast';

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  const fetchBlogs = () => {
    setLoading(true);
    getBlogs()
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        toast.error("Failed to fetch blogs.");
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteBlog(id)
        .then(() => {
          fetchBlogs();
          toast.warn("Blog deleted!");
          hotToast("Blog successfully removed.");
        })
        .catch(error => {
          console.error(error);
          toast.error("Failed to delete blog.");
        });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    toast.info("Logged out successfully.");
    navigate('/login');
  };

  useEffect(() => {
    fetchBlogs();
    setTimeout(() => {
      setAnimate(true);
    }, 50);
  }, []);

  const containerStyles = {
    opacity: animate ? 1 : 0,
    transform: animate ? 'translateY(0px)' : 'translateY(40px)',
    transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
  };

  const getRowStyle = (index) => ({
    opacity: animate ? 1 : 0,
    transform: animate ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.5s ease-out, transform 0.5s ease-out`,
    transitionDelay: `${index * 80}ms`
  });

  return (
    <div className="container my-5" style={containerStyles}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Admin Dashboard</h2>
        <div className="d-flex gap-2">
          <Link to="/admin/new" className="btn btn-success">+ Add Blog</Link>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status" />
          <div className="mt-2">Loading blogs...</div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th style={{ width: "160px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index) => (
                <tr key={blog.id} style={getRowStyle(index)}>
                  <td>
                    <img
                      src={blog.image || "https://via.placeholder.com/80x60?text=No+Image"}
                      alt={blog.title}
                      width="80"
                      height="60"
                      style={{ objectFit: 'cover', borderRadius: '5px' }}
                    />
                  </td>
                  <td className="text-truncate" style={{ maxWidth: "180px" }}>
                    {blog.title}
                  </td>
                  <td>
                    <span className="badge bg-secondary">{blog.category}</span>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={blog.avatar || 'https://i.pravatar.cc/30?u=' + blog.author}
                        alt="Author Avatar"
                        className="rounded-circle"
                        width="30"
                        height="30"
                      />
                      <span>{blog.author}</span>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link to={`/admin/edit/${blog.id}`} className="btn btn-sm btn-outline-info">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">
                    No blogs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
