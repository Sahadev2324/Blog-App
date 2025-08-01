import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container text-center py-5">
      <h1 className="display-3 text-danger">404</h1>
      <h2 className="mb-3">Page Not Found</h2>
      <p className="mb-4">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-dark">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
