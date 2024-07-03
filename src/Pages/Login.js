import React, { useState, useContext } from "react";
import "./mix.css";
import { NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../components/UserDataContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Login = ({ setIsLoggedIn, isLoggedIn }) => {
  const [passShow, setPassShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const history = useNavigate();
  const useCon = useContext(userContext);

  const setVal = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const loginUser = async (e) => {
   
    e.preventDefault();
    const { email, password } = input;

    if (email === "") {
      toast.error("please enter your email");
    } else if (!email.includes("@")) {
      toast.error("enter valid email");
    } else if (password === "") {
      toast.error("please enter your password");
    } else if (password.length < 6) {
      toast.error("password must me 6 char");
    } else {
      setLoading(true);
      const data = await fetch("https://backendbookmanagement-1.onrender.com/user/login", {
        method: "POST",
        headers: {
          "content-type": "application/Json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const res = await data.json();

      if (res.status === 201) {
        setLoading(false);
        toast.success("user login successfully");
        // localStorage.setItem("userdatatoken" , res.result.token)
        useCon.setShow(res); // Update context value using set method
        console.log(useCon.show, "this is data");
        // corrected typo here
        setTimeout(()=>{
          history(`/dashboard/${res.userValid.name}`);

        } , 1500)
      

        setInput({ ...input, email: "", password: "" });
      } else {
        toast.error("user password or email invalid");
        setLoading(false);
      }
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
            <h1>welcome back log In</h1>
            <p>hey we are gald that your are back</p>
          </div>
          <form>
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
            </div>
            <button className="btn" onClick={loginUser}>
              LOGIN
            </button>
            <p>
              don't have account? <NavLink to="/register">signup</NavLink>{" "}
            </p>
          </form>
        </div>
      </section>
      <ToastContainer autoClose  = {1300} />
    </>
  );
};

export default Login;
