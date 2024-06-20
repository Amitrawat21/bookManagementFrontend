import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cards = ( {item , index , booksData , setBooksData }) =>{

    const history = useNavigate();
  
    const deleteBook = async (id) => {
      try {
        // Make DELETE request to API endpoint
        await axios.delete(`http://localhost:8000/book/deletebook/${id}`);
  
        // Update state to remove the deleted book
        setBooksData((prevData) => prevData.filter((book) => book._id !== id));
  
        // Show success toast notification
        toast.success("Book deleted successfully", { autoClose: 1000 });
      } catch (error) {
        // Log the error to console
        console.error("Error deleting book:", error);
  
        // Show error toast notification
        toast.error("Failed to delete book");
      }
    };

  const updateBook = (id, bookname, price, image) => {
    history("/update", { state: { id, bookname, price, image } });
  };



  return (
    <div
    className=""
    style={{
      width: "220px",
      height: "350px",
      backgroundColor: "white",
     boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
      border: "2px solid white",
      borderRadius: "20px",
    }}
    key={index}
  >
    <div>
      <img
        style={{
          width: "220px",
          height: "200px",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
        className="img-fluid"
        src={item.image}
        alt="/"
      />
    </div>

    <h6 className="px-2 my-1 text-white" style={{ fontSize: "15px" }}>
      {item.bookname}
    </h6>
    <p className="m-0 px-2" style={{ fontSize: "25px", color: "red" }}>
      RS. {item.price}
    </p>
    <div className="d-flex justify-content-around align-items-center my-2">
      <button
        className="btn btn-primary"
        onClick={() =>
          updateBook(item._id, item.bookname, item.price, item.image)
        }
      >
        UPDATE
      </button>
      <button
        className="btn btn-danger"
        onClick={() => deleteBook(item._id)}
      >
        DELETE
      </button>
    </div>
  </div>
  )
}

export default Cards
