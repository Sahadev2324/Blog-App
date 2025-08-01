import React, { useEffect, useState } from 'react';
import { getBlogs } from '../services/api';
import Filter from '../components/Filter';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [filters, setFilters] = useState({ category: '', author: '' });

  useEffect(() => {
    getBlogs().then(data => {
      setBlogs(data);
      setFilteredBlogs(data);
    });
  }, []);

  useEffect(() => {
    let filtered = blogs;

    if (filters.category) {
      filtered = filtered.filter(blog => blog.category === filters.category);
    }
    if (filters.author) {
      filtered = filtered.filter(blog => blog.author === filters.author);
    }

    setFilteredBlogs(filtered);
  }, [filters, blogs]);

  return (
    <div className="container my-5">
      <div className="row">
        {/* Filter Sidebar */}
        <div className="col-md-3">
          <Filter
            selectedAuthor={filters.author}
            selectedCategory={filters.category}
            onFilterChange={setFilters}
          />
        </div>

        {/* Blog List */}
        <div className="col-md-9">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map(blog => (
              <div key={blog.id} className="mb-4 p-3 shadow-sm bg-white rounded">
                <h4 className="fw-bold">{blog.title}</h4>
                <p className="text-muted">{blog.author} | {blog.category}</p>
                <p>{blog.content.slice(0, 150)}...</p>
              </div>
            ))
          ) : (
            <p>No blogs match your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
