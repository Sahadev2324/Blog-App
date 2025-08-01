import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createBlog,
  updateBlog,
  getBlogById,
  getAuthors,
  getCategories
} from '../services/api';
import { toast } from 'react-toastify';
import { toast as hotToast } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    author: '',
    category: '',
    image: ''
  });

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    getAuthors().then(setAuthors);
    getCategories().then(setCategories);

    if (isEditMode) {
      getBlogById(id).then(data => {
        setBlogData(data);
      });
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const action = isEditMode
      ? updateBlog(id, blogData)
      : createBlog(blogData);

    action
      .then(() => {
        toast.success(`Blog ${isEditMode ? 'updated' : 'created'} successfully!`);
        hotToast(`Redirecting to Dashboard...`);
        navigate('/admin');
      })
      .catch((error) => {
        console.error("Failed to save blog:", error);
        toast.error("Something went wrong while saving the blog.");
      });
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div
          className="col-lg-8"
          data-aos="fade-up"
        >
          <h2 className="mb-4 fw-bold text-center">
            {isEditMode ? '✏️ Edit Blog' : '📝 Create Blog'}
          </h2>

          <form onSubmit={handleSubmit} className="shadow p-4 bg-white rounded border">

            {/* Title */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={blogData.title}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter blog title"
                required
              />
            </div>

            {/* Content */}
            <div className="mb-3">
              <label htmlFor="content" className="form-label">Content</label>
              <textarea
                id="content"
                name="content"
                value={blogData.content}
                onChange={handleChange}
                className="form-control"
                rows="6"
                placeholder="Write your blog content here..."
                required
              />
            </div>

            {/* Image Upload */}
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Blog Image</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="form-control"
              />
              {blogData.image && (
                <img
                  src={blogData.image}
                  alt="Preview"
                  className="img-thumbnail mt-3"
                  style={{ maxHeight: '200px' }}
                />
              )}
            </div>

            {/* Author Dropdown */}
            <div className="mb-3">
              <label htmlFor="author" className="form-label">Author</label>
              <select
                id="author"
                name="author"
                value={blogData.author}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select Author</option>
                {authors.map(author => (
                  <option key={author.id} value={author.name}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Dropdown */}
            <div className="mb-4">
              <label htmlFor="category" className="form-label">Category</label>
              <select
                id="category"
                name="category"
                value={blogData.category}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-success">
                {isEditMode ? 'Update Blog' : 'Create Blog'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/admin')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
