import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function ForgottenPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstpassword, setFirstPassword] = useState("");
  const [secondpassword, setSecondPassword] = useState("");
  const [answer, setAnswer] = useState("");

  async function forgotPassword(e) {
    try {
      e.preventDefault();
      if (
        email === "" ||
        firstpassword === "" ||
        secondpassword ||
        answer === ""
      ) {
        toast.error("Please Fill All Fields");
      }
      if (firstpassword !== secondpassword) {
        toast.error("password is not same");
      }
           if (firstpassword < 8 || secondpassword < 8) {
        toast.error("Password AtLeast 8 charactors");
      } else {
        let confirmPassword = secondpassword;
        let result = await fetch(
          `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, confirmPassword, answer }),
          }
        );
        // console.log(user);
        result = await result.json();
        if ( result?.success) {
          toast.success(result.message);
          navigate("/login");
        } else toast.error(result.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error("error in forgot password")
    }
  }
  //'hideShown Password
  const [firstpasswordType, setFirstPasswordType] = useState("password");
  const [secondpasswordType, setSecondPasswordType] = useState("password");

  const toggleFirstPassword = (e) => {
        e.preventDefault()

    if (firstpasswordType === "password") {
      setFirstPasswordType("text");
      return;
    }
    setFirstPasswordType("password");
  };
  const toggleSecondPassword = (e) => {
        e.preventDefault()

    if (firstpasswordType === "password") {
      setSecondPasswordType("text");
      return;
    }
    setSecondPasswordType("password");
  };
  return (
    <Layout title={"Password Forgotten "} keywords={"Reset User Password,Forgotteen Password"}>
        e.preventDefault()

      <div className="container py-5  bg=light text-center align-items-center justify-content-md-center">
        <div className="card   shadow  m-auto  py-5">
          <div className="card-body">
            <h4 className="card-title">
              <div className=" text-center h1">Reset Password</div>
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
              <div className=" from-group my-1">
                <select className="form-select from-control cursor-pointer">
                  <option>What was the name of your first pet?</option>
                  <option>What is your favorite food?</option>
                  <option>What is your favorite Game?</option>
                  <option>What is your favorite Man?</option>
                  <option>Are you best?</option>
                </select>
                <input
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  type="text"
                  placeholder="Answer------"
                  className="form-control my-1"
                  required
                />
              </div>
              <div className="input-group">
                <input
                  value={firstpassword}
                  onChange={(e) => {
                    setFirstPassword(e.target.value);
                  }}
                  className="form-control  rounded p-2  border-right-0  mb-1 "
                  type={firstpasswordType}
                  placeholder="New Password"
                  required
                />
                <div className="input-group-btn">
                  <button
                    className="btn btn-outline-primary p-2"
                    onClick={toggleFirstPassword}
                  >
                    {firstpasswordType === "password" ? (
                      <AiFillEyeInvisible />
                    ) : (
                      <AiFillEye />
                    )}
                  </button>
                </div>
              </div>
              <div className="input-group">
                <input
                  value={secondpassword}
                  onChange={(e) => {
                    setSecondPassword(e.target.value);
                  }}
                  className="form-control  rounded p-2   mb-1 "
                  type={secondpasswordType}
                  placeholder="Confirm Password"
                  required
                />
                <div className="input-group-btn">
                  <button
                    className="btn btn-outline-primary p-2"
                    onClick={toggleSecondPassword}
                  >
                    {firstpasswordType === "password" ? (
                      <AiFillEyeInvisible />
                    ) : (
                      <AiFillEye />
                    )}
                  </button>
                </div>
              </div>
              <Link to="/resetPassword" className="float-right">
                Reset by Token?
              </Link>
              <div className="form-group ">
                <button
                  type="submit"
                  onClick={(e) => forgotPassword(e)}
                  className="btn btn-success text-center  m-3"
                >
                  Reset Password
                </button>
              </div>
              <div className="mt-4 text-center">
                I Remembered Password?
                <Link to="/login">LogIn</Link>
              </div>
            </form>
          </div>
          <div>Copyright © 2023 — ConfortZone</div>
        </div>
      </div>
    </Layout>
  );
}
export default ForgottenPassword;
