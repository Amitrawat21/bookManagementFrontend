import React from "react";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import img from "../Images/books.png";
import "./Home.css";
const Home = () => {
  const { name } = useParams();
  const history = useNavigate();
  const viewBook = () => {
    history("/books");
  };
  return (
    <div style={{ height: "100%", width: "100%", background: "green" }}>
      <Navbar />
      <div className="Home-page bg-dark text-white container-fluid  d-flex justify-content-center align-items-start">
        <h5 className="bg-dark text-white" style={{ fontSize: "40px" }}>
          {name} book store
        </h5>
        <div className="row container">
          <div
            className="col-lg-6 d-flex justify-content-center align-items-start flex-column"
            style={{ height: "91.5vh" }}
          >
            <h2 style={{ fontSize: "80px" }}>BOOK STORE</h2>
            <h3 style={{ fontSize: "50px" }}>FOR U</h3>
            <p style={{ color: "silver" }} className="mb-0">
              CHECKOUT THE BOOK FROM HERE
            </p>
            <button className="viewBook my-3" onClick={viewBook}>
              VIEW BOOKS
            </button>
          </div>
          <div
            className="col-lg-6 d-flex justify-content-center align-items-center flex-column"
            style={{ height: "91.5vh" }}
          >
            <img className="img-fluid homeimg" src={img} alt="/" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
