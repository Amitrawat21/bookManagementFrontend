import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookSection = ({ data }) => {
  const [booksData, setBooksData] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    setBooksData(data);
  }, [data]);

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/book/deletebook/${id}`);
      setBooksData((prevData) => prevData.filter((book) => book._id !== id));
      toast.success("deleting", { autoClose: 1000 });
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const updateBook = (id, bookname, price, image) => {
    history("/update", { state: { id, bookname, price, image } });
  };

  return (
    <>
      <div className="d-flex justify-content-around align-items-center flex-wrap my-3 ">
        {booksData.map((item, index) => (
          <div
            className=""
            style={{
              width: "220px",
              height: "350px",
              backgroundColor: "black",
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
        ))}
      </div>
      <ToastContainer />
    </>
  );
};

export default BookSection;
