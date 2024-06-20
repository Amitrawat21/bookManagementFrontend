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
    <div style={{backgroundColor : "#9932CC", height : "100vh"}}>

    <div style={{ height: "80%", width: "100%", background: "white" , height : '90vh'   }}>
      <Navbar name= {name} />
      <div className=" text-white container-fluid  d-flex justify-content-center align-items-start" style={{marginBottom : "200px"}}>
        <h5 className="text-white" style={{ fontSize: "25px"  , padding : "5px" , width : "300px" , backgroundColor : "#9370DB" , borderRadius : "15px" , textAlign : "center" , marginTop : "20px" }}>
          {name} book store
        </h5>
        <div className="row container">
          <div
            className="col-lg-6 d-flex justify-content-center align-items-start flex-column"
            style={{ height: "91.5vh" }}
          >
            <h2 style={{ fontSize: "80px" , color : "black" }}>BOOK STORE</h2>
            <h3 style={{ fontSize: "50px" , color : "black" }}>FOR U</h3>
            <p style={{ color: "#808080" }} className="mb-0">
              CHECKOUT THE BOOK FROM HERE
            </p>
            <button className="viewBook my-3" style={{padding : "5px" , borderRadius  : "20px"  }} onClick={viewBook}>
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
    </div>
   
  );
};

export default Home;
