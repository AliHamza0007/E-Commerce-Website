import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function ForgottenPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [firstpassword, setFirstPassword] = useState("");
  const [secondpassword, setSecondPassword] = useState("");

  async function forgotPassword(e) {
    try {
      e.preventDefault();
      if (email === "" || firstpassword === "" || secondpassword === "") {
        toast.error("Please Fill All Fields");
      }
      if (firstpassword !== secondpassword) {
        toast.error("password is not same");
      }
      if (firstpassword < 8 || secondpassword < 8) {
        toast.error("Password AtLeast 8 charactors");
      } else {
        let confirmPassword = secondpassword;
        if (token) {
          let result = await fetch(
            `${process.env.REACT_APP_API}/api/v1/auth/reset-password`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, confirmPassword, token }),
            }
          );
          // console.log(user);
          result = await result.json();
          if (result?.success) {
            toast.success(result.message);
            navigate("/login");
          } else toast.error(result.message);
        } else {
          toast.error("ResetToken not found Try Question Method");
        }
      }
    } catch (error) {
      // console.log(error);
      toast.error("error in reset password")
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
  useEffect(() => {
    let resetToken = JSON.parse(localStorage.getItem("resetToken"));
    if (resetToken) {
      setToken(resetToken?.resetToken);
      setEmail(resetToken?.email);
    }
  }, []);

  return (
    <Layout title={"Password Forgotten "} keywords={"Reset User Password,Forgotton Password"}>
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
                  required
                  autoFocus
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
                  required
                  name="password"
                  placeholder="New Password"
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
                  required
                  name="password"
                  placeholder="Confirm Password"
                />
                <div className="input-group-btn">
                  <button
                    className="btn btn-outline-primary p-2"
                    onClick={toggleSecondPassword}
                  >
                    {secondpasswordType === "password" ? (
                      <AiFillEyeInvisible />
                    ) : (
                      <AiFillEye />
                    )}
                  </button>
                </div>
              </div>
              <Link to="/forgotPassword" className="float-right">
                Reset by Question?
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
