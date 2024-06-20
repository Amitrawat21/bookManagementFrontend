import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cards from "./Cards";
import axios from "axios";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookSection = ({ data }) => {
  const [booksData, setBooksData] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    setBooksData(data);
  }, [data]);

 

  return (
    <>
      <div className="d-flex justify-content-around align-items-center flex-wrap my-3 ">
        {booksData.map((item, index) => (
         <Cards key={item._id} item = {item} index = {index} booksData = {booksData} setBooksData={setBooksData}/>
        ))}
      </div>
      <ToastContainer />
    </>
  );
};

export default BookSection;
