// src/api/blogApi.js
import axios from 'axios';

// ✅ Define base API instance
const API = axios.create({
  baseURL: 'http://localhost:3001', // ✅ JSON Server running here
});

// -------------------- BLOGS --------------------
export const getBlogs = () => API.get('/blogs').then(res => res.data);
export const getBlogById = (id) => API.get(`/blogs/${id}`).then(res => res.data);
export const createBlog = (blog) => API.post('/blogs', blog);
export const updateBlog = (id, blog) => API.put(`/blogs/${id}`, blog);
export const deleteBlog = (id) => API.delete(`/blogs/${id}`);

export const getBlog = getBlogById; // optional alias

// -------------------- AUTHORS --------------------
export const getAuthors = () => API.get('/authors').then(res => res.data);
export const createAuthor = (name) => API.post('/authors', { name });
export const deleteAuthor = (id) => API.delete(`/authors/${id}`);

// -------------------- CATEGORIES --------------------
export const getCategories = () => API.get('/categories').then(res => res.data);
export const createCategory = (name) => API.post('/categories', { name });
export const deleteCategory = (id) => API.delete(`/categories/${id}`);
