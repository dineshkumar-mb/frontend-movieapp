import React, { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-light shadow-sm fixed-top w-100">
      <div className="container d-flex justify-content-between align-items-center p-3">
        {/* Logo */}
        <a href="#" aria-label="Back to homepage" className="d-flex align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-8 h-8 text-primary">
            <path d="M27.912 7.289l-10.324-5.961c-0.455-0.268-1.002-0.425-1.588-0.425s-1.133 0.158-1.604 0.433l0.015-0.008-10.324 5.961c-0.955 0.561-1.586 1.582-1.588 2.75v11.922c0.002 1.168 0.635 2.189 1.574 2.742l0.016 0.008 10.322 5.961c0.455 0.267 1.004 0.425 1.59 0.425 0.584 0 1.131-0.158 1.602-0.433l-0.014 0.008 10.322-5.961c0.955-0.561 1.586-1.582 1.588-2.75v-11.922c-0.002-1.168-0.633-2.189-1.573-2.742zM27.383 21.961c0 0.389-0.211 0.73-0.526 0.914l-0.004 0.002-10.324 5.961c-0.152 0.088-0.334 0.142-0.53 0.142s-0.377-0.053-0.535-0.145l0.005 0.002-10.324-5.961c-0.319-0.186-0.529-0.527-0.529-0.916v-11.922c0-0.389 0.211-0.73 0.526-0.914l0.004-0.002 10.324-5.961c0.152-0.090 0.334-0.143 0.53-0.143s0.377 0.053 0.535 0.144l-0.006-0.002 10.324 5.961c0.319 0.185 0.529 0.527 0.529 0.916z"></path>
          </svg>
        </a>

        {/* Navigation Links */}
        <ul className={`d-flex list-unstyled mb-0 ${menuOpen ? "flex-column" : "d-none d-lg-flex"}`}>
          <li className="mx-3">
            <a href="#" className="text-decoration-none text-dark hover-text-primary">Home</a>
          </li>
          <li className="mx-3">
            <a href="#" className="text-decoration-none text-dark hover-text-primary">Movies</a>
          </li>
          <li className="mx-3">
            <a href="#" className="text-decoration-none text-dark hover-text-primary">About</a>
          </li>
          <li className="mx-3">
            <a href="#" className="text-decoration-none text-dark hover-text-primary">Contact</a>
          </li>
        </ul>

        {/* Mobile Buttons */}
        <div className="d-flex align-items-center">
          <button className="btn btn-primary d-none d-lg-block mx-2">Sign In</button>
          <button className="btn btn-outline-primary d-none d-lg-block mx-2">Sign Up</button>

          {/* Mobile Menu Icon */}
          <button onClick={toggleMenu} className="btn btn-light d-lg-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-dark">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="d-lg-none mt-4">
          <a href="#" className="d-block px-4 py-2 text-dark text-decoration-none hover-bg-light">Home</a>
          <a href="#" className="d-block px-4 py-2 text-dark text-decoration-none hover-bg-light">Movies</a>
          <a href="#" className="d-block px-4 py-2 text-dark text-decoration-none hover-bg-light">About</a>
          <a href="#" className="d-block px-4 py-2 text-dark text-decoration-none hover-bg-light">Contact</a>
          <div className="mt-4">
            <button className="btn btn-primary w-100 mb-2">Sign In</button>
            <button className="btn btn-outline-primary w-100">Sign Up</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
