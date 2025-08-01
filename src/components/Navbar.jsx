import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isAdmin") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm px-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4" to="/">📝 BlogApp</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav gap-2">
            <li className="nav-item">
              <Link className="btn btn-outline-light" to="/">Home</Link>
            </li>

            {isLoggedIn && (
              <li className="nav-item">
                <Link className="btn btn-outline-light" to="/admin">Dashboard</Link>
              </li>
            )}

            {!isLoggedIn ? (
              <li className="nav-item">
                <Link className="btn btn-outline-light" to="/login">Login</Link>
              </li>
            ) : (
              <li className="nav-item">
                <button className="btn btn-light text-primary" onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
