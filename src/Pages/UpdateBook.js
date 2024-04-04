import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateBook = () => {
  const location = useLocation(); // Get location object
  const history = useNavigate();
  const { id, bookname, price, image } = location.state || {};
  const [input, setInput] = useState({
    bookname: bookname,
    price: price,
    image: image,
  });

  const setVal = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const editData = async (e) => {
    e.preventDefault();
    const { bookname, description, price, image } = input;

    try {
      const response = await axios.put(
        `http://localhost:8000/book/updatebook/${id}`,
        {
          bookname,
          price,
          image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = response.data;

      console.log(res, "datata");

      if (res.status === 200) {
        alert("edit book sucessfully sucessfully");
        history("/books");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div
      className="bg-dark d-flex justify-content-center align-items-center"
      style={{ minHeight: "91.2vh" }}
    >
      <div
        className="container p-5"
        style={{ width: "70%", backgroundColor: "gray" }}
      >
        {" "}
        {/* Adjusted container width */}
        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label text-white"
          >
            Book Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter book name"
            name="bookname"
            value={input.bookname}
            onChange={setVal}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label text-white"
          >
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter book price"
            value={input.price}
            name="price"
            onChange={setVal}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label text-white"
          >
            image url
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter image url"
            name="image"
            value={input.image}
            onChange={setVal}
          />
        </div>
        <button className="btn-btn-success" onClick={editData}>
          submit to update
        </button>
      </div>
    </div>
  );
};

export default UpdateBook;
