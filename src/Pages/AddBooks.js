import React, { useState ,  useContext } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { userContext } from "../components/UserDataContext";
import { toast  , ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddBooks = () => {
    const useCon = useContext(userContext);
  const [input, setInput] = useState({
    bookname: "",
    description: "",
    price: "",
    image: "",
  });
  const userId = useCon?.show?.userValid?._id;

  const setVal = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const addUserdata = async (e) => {
    e.preventDefault();
    const { bookname, description, price, image } = input;

    try {
      const response = await axios.post(
        "http://localhost:8000/book/addbook",{
          bookname,
          description,
          price,
           userId,
          image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = response.data;


      if (res.status === 201) {
        toast.success("User add book sucessfully");
        setInput({
          ...input,
          bookname: "",
          description: "",
          price: "",
          image: "",
        });
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <>
     <div>
      <Navbar />
      <div
        className="bg-dark d-flex justify-content-center align-items-center"
        style={{ minHeight: "91.2vh" }}
      >
        <div className="container  p-5" style={{ width: "70%" , backgroundColor : "gray" , borderRadius : "50px" }}>
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
              value={input.bookname}
              name="bookname"
              onChange={setVal}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label text-white"
            >
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter book description"
              value={input.description}
              name="description"
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
              value={input.image}
              name="image"
              onChange={setVal}
            />
          </div>
          <button className="btn-btn-success" onClick={addUserdata}>
            submit
          </button>
        </div>
      </div>
    </div>
    <ToastContainer/>
    </>
   
  );
};

export default AddBooks;
