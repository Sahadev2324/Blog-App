// src/components/Filter.jsx
import React, { useEffect, useState } from 'react';
import { getAuthors, getCategories } from '../services/api';
import './Filter.css';

const Filter = ({ filters, setFilters }) => {
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    getAuthors().then(setAuthors);
    getCategories().then(setCategories);
  }, []);

  const handleCheckboxChange = (type, value) => {
    const current = filters[type];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];

    setFilters(prev => ({ ...prev, [type]: updated }));
  };

  const clearFilters = () => {
    setFilters({ category: [], author: [] });
  };

  return (
    <div className={`filter-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="filter-header d-flex justify-content-between align-items-center">
        <span className="filter-title">Filters</span>
        <button
          className="btn btn-outline-danger"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? 'Expand' : 'Collapse'}
        </button>
      </div>

      {!isCollapsed && (
        <div className="mt-3">
          <div className="mb-3">
            <strong>Categories</strong>
            {categories.map(cat => (
              <div key={cat.id} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={filters.category.includes(cat.name)}
                  onChange={() => handleCheckboxChange('category', cat.name)}
                  id={`cat-${cat.id}`}
                />
                <label className="form-check-label" htmlFor={`cat-${cat.id}`}>
                  {cat.name}
                </label>
              </div>
            ))}
          </div>

          <div className="mb-3">
            <strong>Authors</strong>
            {authors.map(author => (
              <div key={author.id} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={filters.author.includes(author.name)}
                  onChange={() => handleCheckboxChange('author', author.name)}
                  id={`auth-${author.id}`}
                />
                <label className="form-check-label" htmlFor={`auth-${author.id}`}>
                  {author.name}
                </label>
              </div>
            ))}
          </div>

          <button className="btn btn-sm btn-outline-danger mt-2" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Filter;
