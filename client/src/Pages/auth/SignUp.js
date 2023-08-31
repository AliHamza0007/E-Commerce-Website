import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import * as EmailValidator from "email-validator";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [answer, setAnswer] = useState("");

  const SubmitHandler = async (e) => {
    e.preventDefault();

    let validEmail = EmailValidator.validate(email);
    if (validEmail) {
      if (!name || !password || !email ||!postalCode|| !phone || !address || !answer) {
        toast.error("Please Fill All Fields");
      } else if (password.length < 8) {
        toast.error("password min-length 8");
      } else {
        let resetToken = Math.floor(Math.random() * (300 * 1000));
        // console.log(resetToken);
        let result = await fetch(
          `${process.env.REACT_APP_API}/api/v1/auth/register`,
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              resetToken,
              name,
              password,
              email,
              phone,
              postalCode,
              address,
              answer,
            }),
          }
        );
        let res = await result.json();
        // console.log(res);
        if (res?.success) {
          // console.log(user);
          toast.success(res.message);
          localStorage.setItem("user", JSON.stringify(res.data));
          localStorage.setItem("token", JSON.stringify(res.auth));
          localStorage.setItem(
            "resetToken",
            JSON.stringify({ resetToken, email })
          );
          navigate("/login");
        }
      }
    } else {
      toast.error("Please Enter Valid Email Address");
    }
  };
  //'hideShown Password
  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  return (
    <Layout
      title={"Register Page"}
      keywords={"Free ,User SignUp,User register"}
    >
      <div className="container py-2  bg=light text-center align-items-center justify-content-md-center">
        <div className="card   shadow  m-auto ">
          <div className="card-body">
            <h4 className="card-title">
              {" "}
              <div className=" text-center h1">Registration Page</div>
            </h4>
            <form className="form">
              <div className="form-group my-1">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="abc@email.com..."
                  className="form-control "
                  autoFocus
                  required
                />
              </div>
              <div className="form-group my-1">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Name------"
                  className="form-control pink"
                />
              </div>
              <div className="input-group my-1">
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="form-control  rounded p-2  border-right-0  mb-1 "
                  type={passwordType}
                  required
                  name="password"
                  placeholder=" Password...."
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

              <div className="form-group my-1">
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="number"
                  placeholder="+phone------"
                  className="form-control pink"
                  required
                />
              </div>
              <div className="form-group my-1">
                <input
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  placeholder="Address------"
                  className="form-control pink"
                />
              </div>
              <div className="form-group my-1">
                <input
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  type="text"
                  placeholder="Postal Code------"
                  className="form-control pink"
                />
              </div>
              <div className=" from-group my-1">
                <select className="form-select cursor-pointer">
                  <option>What was the name of your first pet?</option>
                  <option>What is your favorite food?</option>
                  <option>What is your favorite Game?</option>
                  <option>What is your favorite Man?</option>
                  <option>Are you best?</option>
                </select>
                <input
                  required
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  type="text"
                  placeholder="Answer Please------"
                  className="form-control my-1"
                />
              </div>
              <div className="form-group my-1">
                <button
                  onClick={SubmitHandler}
                  type="submit"
                  className="btn btn-success text-center  m-3"
                >
                  SignUp
                </button>
              </div>
              <div className="mt-4 text-center">
                Don't have an account?
                <Link to="/login">LogIn</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default SignUp;
