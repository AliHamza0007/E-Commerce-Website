import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/auth";
import Layout from "../../components/Layout/Layout";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./Login.css";
import * as EmailValidator from "email-validator";

function Login() {
  const navigate = useNavigate();
  const Location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [auth, setAuth] = useAuth();

  const LogIn = async (e) => {
  
      e.preventDefault();
      if (email === "" && password === "") {
        toast.error("Please Fill All Fields");
      }
      let validEmail = EmailValidator.validate(email);
      if (validEmail){ if (password.length < 8) {
        toast.error("Password Must be minimum 8 charactors");
      } else {
        let result = await fetch(
          `${process.env.REACT_APP_API}/api/v1/auth/login`,
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );
        result = await result.json();
        if ( result?.success) {
          toast.success(result.message);
          setAuth({ ...auth, user: result.user, token: result.token });
          localStorage.setItem("auth", JSON.stringify(result));
          navigate(Location.state || "/");
        } else {
          toast.error(result.message);
        }
      }
      }
        else {
        toast.error("Please Enter Valid Email Address");
      }
     
      }
    

  //'hideShown Password
  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = (e) => {
    e.preventDefault()

    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  return (
    <Layout title={"Login page"} keywords={"User login,SignIn,LogIn"}>
      <div className="container py-5  bg=light text-center align-items-center justify-content-md-center">
        <div className="card   shadow  m-auto  py-5">
          <div className="card-body">
            <h4 className="card-title">
              <div className=" text-center h1">Login Page</div>
            </h4>
            <form className="form">
              <div className="form-group">
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="form-control my-3 rounded p-2 "
                  type="email"
                  placeholder="Enter Email"
                  autoFocus
                  required
                />
              </div>

              <div className="input-group">
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="form-control  rounded p-2   mb-1 "
                  type={passwordType}
                  required
                  name="password"
                  placeholder="Enter Password"
                />
                <div className="input-group-btn">
                  <button
                    className="btn btn-outline-primary p-2"
                    onClick={togglePassword}
                  >
                    {passwordType === "password" ? (
                      <AiFillEyeInvisible />
                    ) : (
                      <AiFillEye />
                    )}
                  </button>
                </div>
              </div>
              <Link to="/resetPassword" className="float-right">
                Forgot Password?
              </Link>
              <div className="form-group ">
                <button
                  type="submit"
                  onClick={LogIn}
                  className="btn btn-success text-center  m-3"
                >
                  Login
                </button>
              </div>
              <div className="mt-4 text-center">
                Don't have an account?
                <Link to="/register">Create One</Link>
              </div>
            </form>
          </div>
          <div>Copyright © 2023 — ConfortZone</div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
