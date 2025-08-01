import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ManageData = () => {
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newAuthor, setNewAuthor] = useState('');
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    axios.get("http://localhost:3000/authors").then(res => setAuthors(res.data));
    axios.get("http://localhost:3000/categories").then(res => setCategories(res.data));
  }, []);

  const addAuthor = () => {
    if (!newAuthor.trim()) return toast.error("Enter author name");
    axios.post("http://localhost:3000/authors", { name: newAuthor }).then(res => {
      setAuthors([...authors, res.data]);
      setNewAuthor('');
      toast.success("Author added");
    });
  };

  const addCategory = () => {
    if (!newCategory.trim()) return toast.error("Enter category name");
    axios.post("http://localhost:3000/categories", { name: newCategory }).then(res => {
      setCategories([...categories, res.data]);
      setNewCategory('');
      toast.success("Category added");
    });
  };

  return (
    <div className="container mt-5">
      <h2>Manage Authors and Categories</h2>

      <div className="row mt-4">
        {/* Authors */}
        <div className="col-md-6">
          <h4>Authors</h4>
          <ul className="list-group mb-3">
            {authors.map((author, index) => (
              <li key={index} className="list-group-item">{author.name}</li>
            ))}
          </ul>
          <input
            value={newAuthor}
            onChange={e => setNewAuthor(e.target.value)}
            className="form-control mb-2"
            placeholder="New author"
          />
          <button onClick={addAuthor} className="btn btn-primary">Add Author</button>
        </div>

        {/* Categories */}
        <div className="col-md-6">
          <h4>Categories</h4>
          <ul className="list-group mb-3">
            {categories.map((cat, index) => (
              <li key={index} className="list-group-item">{cat.name}</li>
            ))}
          </ul>
          <input
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            className="form-control mb-2"
            placeholder="New category"
          />
          <button onClick={addCategory} className="btn btn-success">Add Category</button>
        </div>
      </div>
    </div>
  );
};

export default ManageData;
