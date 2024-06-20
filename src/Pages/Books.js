import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { userContext } from "../components/UserDataContext";
import BookSection from "../components/BookSection";
const Books = () => {
  const useCon = useContext(userContext);
  const[Data, setData] = useState([])
  const userId = useCon?.show?.userValid?._id;

  useEffect(() => {
    const fetch = async () => {
      const bookData = await axios.get(
        `http://localhost:8000/book/userAllBooks/${userId}`

      );
    
      setData(bookData.data.data)
     
     

    };
    fetch();
  }, [userId]);


  
  return (
    <div className="">
      <Navbar />
      <div  style={{ minHeight: "91.5vh"}}>
        <div className="d-flex justify-content-center align-item-center " >
          <h4 className=" my-5" style={{color : "black" , fontSize : "30px"}}>BOOK SECTION</h4>
          
        </div>
        {
            Data.length>0?<BookSection data = {Data}/> : <h1  style={{textAlign: "center"}}>Pleasee add book</h1>

            
        }
      </div>
    </div>
  );
};

export default Books;
