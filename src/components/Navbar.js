import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "./UserDataContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const useCon = useContext(userContext);
  const isAuthenticated = useCon?.show?.userValid;
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/";
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    window.location.href = "/";
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand me-auto" href="#">
              Book store
            </a>{" "}
            {/* 'me-auto' class pushes the brand to the left */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {" "}
                {/* 'ms-auto' class pushes the nav links to the right */}
                <Link className="nav-item nav-link active" to="/books">
                  BOOKS
                </Link>
                <Link className="nav-item nav-link active" to="/addBooks">
                  ADD BOOKS
                </Link>
                <a onClick={handleLogout} className="navbar-brand me-auto">
                  logout
                </a>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
