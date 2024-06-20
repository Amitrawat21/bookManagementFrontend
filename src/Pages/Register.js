import React, { useState } from "react";
import "./mix.css";
import { NavLink , useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { ToastContainer, toast } from 'react-toastify';

const Register = () => {

  const history = useNavigate()
  const [passShow, setPassShow] = useState(false);
  const [CpassShow, setCPassShow] = useState(false);

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const setVal = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const addUserdata = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = input;
    if (name === "") {
      toast.error("please enter your name");
      return;
    } else if (email === "") {
      toast.error("please enter your email");
      return;
    } else if (!email.includes("@")) {
      toast.error("enter valid email");
      return;
    } else if (password === "") {
      toast.error("please enter your password");
      return;
    } else if (password.length < 6) {
      toast.error("password must be at least 6 characters");
      return;
    } else if (cpassword === "") {
      toast.error("please enter your confirm password");
      return;
    } else if (password !== cpassword) {
      toast.error("password and confirm password do not match");
      return;
    }
  
    const data = await fetch("http://localhost:8000/user/register", {
      method: "POST",
      headers: {
        "content-type": "application/Json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        cpassword,
      }),
    });
    const res = await data.json();
  
    if (res.status === 201) {

      toast.success("user registration successfully");
       setTimeout(()=>{
         history("/")
       } , 1500)
     
      setInput({
        ...input,
        name: "",
        email: "",
        password: "",
        cpassword: "",


      });

    } else if (res.error === "this email already exits") {
      toast.error("Email already exists");
    }
  };
  

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>SIGN UP</h1>
            <p style={{ textAlign: "center" }}>fill all the details</p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="name">Name</label>
              <input
                type="name"
                name="name"
                id="name"
                placeholder="enter your name"
                value={input.name}
                onChange={setVal}
              />
            </div>

            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="enter your email addresss"
                value={input.email}
                onChange={setVal}
              />
            </div>

            <div className="form_input">
              <label htmlFor="password">password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="enter your password"
                  value={input.password}
                  onChange={setVal}
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "show" : "hide"}
                </div>
              </div>

              <label htmlFor="password">confirm-password</label>
              <div className="two">
                <input
                  type={!CpassShow ? "password" : "text"}
                  name="cpassword"
                  id="cpassword"
                  placeholder="enter your confirm password"
                  value={input.cpassword}
                  onChange={setVal}
                />
                <div
                  className="showpass"
                  onClick={() => setCPassShow(!CpassShow)}
                >
                  {!CpassShow ? "show" : "hide"}
                </div>
              </div>
            </div>

            <button className="btn" onClick={addUserdata}>
              Sign up
            </button>
            <p>
              Already have an account ? <NavLink to="/">Log In</NavLink>{" "}
            </p>
          </form>
        </div>
      </section>
      <ToastContainer autoClose =  {1200} />
    </>
  );
};

export default Register;
