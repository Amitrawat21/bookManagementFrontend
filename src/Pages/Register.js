import React, { useState } from "react";
import "./mix.css";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Register = () => {
  const history = useNavigate();
  const [passShow, setPassShow] = useState(false);
  const [CpassShow, setCPassShow] = useState(false);
  const [loading, setLoading] = useState(false);

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

    try {
      setLoading(true);
      const response = await fetch("https://backendbookmanagement-1.onrender.com/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          cpassword,
        }),
      });

      const res = await response.json();

      if (res.status === 201) {
        setLoading(false);
        toast.success("user registration successfully");
        setTimeout(() => {
          history("/");
        }, 1500);

        setInput({
          name: "",
          email: "",
          password: "",
          cpassword: "",
        });
      } else if (res.error === "this email already exits") {
        toast.error("Email already exists");
       
     
      }
    } catch (error) {
   
      toast.error("Something went wrong. Please try again later.");
    }
    finally{
      setLoading(false);

    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                zIndex: 1000,
              }}
            >
              please wait ... &nbsp;
              <CircularProgress />
            </Box>
          )}
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
                placeholder="enter your email address"
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
              Already have an account? <NavLink to="/">Log In</NavLink>
            </p>
          </form>
        </div>
      </section>
      <ToastContainer autoClose={1200} />
    </>
  );
};

export default Register;
