// src/api/blogApi.js
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getBlogs = () => axios.get(`${API_URL}/blogs`).then(res => res.data);
export const getBlogById = (id) => axios.get(`${API_URL}/blogs/${id}`).then(res => res.data);
export const createBlog = (blog) => axios.post(`${API_URL}/blogs`, blog);
export const updateBlog = (id, blog) => axios.put(`${API_URL}/blogs/${id}`, blog);
export const deleteBlog = (id) => axios.delete(`${API_URL}/blogs/${id}`);

export const getAuthors = () => axios.get(`${API_URL}/authors`).then(res => res.data);
export const getCategories = () => axios.get(`${API_URL}/categories`).then(res => res.data);
export const createAuthor = (author) => axios.post(`${API_URL}/authors`, author);
export const createCategory = (category) => axios.post(`${API_URL}/categories`, category);
