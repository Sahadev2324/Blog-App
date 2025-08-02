// src/api/blogApi.js
import axios from 'axios';

const API = axios.create({
  baseURL: "/", // Must match your JSON Server port
}); // Ensure this matches your running JSON Server port

// -------------------- BLOGS --------------------
export const getBlogs = () => axios.get(`${API_URL}/blogs`).then(res => res.data);
export const getBlogById = (id) => axios.get(`${API_URL}/blogs/${id}`).then(res => res.data);
export const createBlog = (blog) => axios.post(`${API_URL}/blogs`, blog);
export const updateBlog = (id, blog) => axios.put(`${API_URL}/blogs/${id}`, blog);
export const deleteBlog = (id) => axios.delete(`${API_URL}/blogs/${id}`);

// Optional alias
export const getBlog = getBlogById;

// -------------------- AUTHORS --------------------
export const getAuthors = () => axios.get(`${API_URL}/authors`).then(res => res.data);
export const createAuthor = (name) => axios.post(`${API_URL}/authors`, { name });
export const deleteAuthor = (id) => axios.delete(`${API_URL}/authors/${id}`);

// -------------------- CATEGORIES --------------------
export const getCategories = () => axios.get(`${API_URL}/categories`).then(res => res.data);
export const createCategory = (name) => axios.post(`${API_URL}/categories`, { name });
export const deleteCategory = (id) => axios.delete(`${API_URL}/categories/${id}`);
