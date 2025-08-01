import React, { useEffect, useState } from 'react';
import { getBlogs } from '../services/api';
import BlogCard from '../components/BlogCard';
import Filter from '../components/Filter';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [filters, setFilters] = useState({ category: [], author: [] });

  useEffect(() => {
    getBlogs()
      .then((data) => {
        setBlogs(data);
        setFilteredBlogs(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    let filtered = blogs;

    if (filters.category.length > 0) {
      filtered = filtered.filter(blog =>
        filters.category.includes(blog.category)
      );
    }

    if (filters.author.length > 0) {
      filtered = filtered.filter(blog =>
        filters.author.includes(blog.author)
      );
    }

    setFilteredBlogs(filtered);
  }, [filters, blogs]);

  return (
    <div className="container-fluid">
      {/* Fixed Filter Sidebar */}
      <Filter filters={filters} setFilters={setFilters} />

      {/* Main Blog Content */}
      <div className="main-content" style={{ marginLeft: '280px', padding: '2rem' }}>
        {filteredBlogs.length > 0 ? (
          <div className="row g-4">
            {filteredBlogs.map(blog => (
              <div
                className="col-md-6 col-lg-4"
                key={blog.id}
                style={{
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.03)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-warning text-center">
            No blogs match the selected filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
