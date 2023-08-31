import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const user = { name, password, phone, address, postalCode };
  const update = async (e) => {
    try {
      e.preventDefault();
      let result = await fetch(
        `${process.env.REACT_APP_API}/api/v1/auth/user-update/${
          auth?.user?.id || auth?.user?._id
        }`,
        {
          method: "put",
          headers: {
            Authorization: auth?.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      result = await result.json();
      // console.log(res);
      if (result?.success) {
        // console.log(user);
        toast.success(result.message);
        setAuth({ ...auth, user: result?.updateUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = result?.updateUser;
        localStorage.setItem("auth", JSON.stringify(ls));
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error("error in profile page");
    }
  };
  function preFill() {
    setEmail(auth?.user.email);
    setName(auth?.user.name);
    setPhone(auth?.user.phone);
    setAddress(auth?.user.address);
    setPostalCode(auth?.user.postalCode);
  }

  useEffect(() => {
    preFill();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout
      title={"User Profile"}
      keywords={"Profile ,User Profile,Comfort Furniture,Free"}
    >
      <div className="container-fluid">
        <UserMenu />
        <div className="row">
          <div className="col-md-12 col">
            <div className="container registerbg justify-content-center">
              <h1 className="text-center "> Profile Manage</h1>
              <div className="row">
                <div className=" col">
                  <form>
                    <div className="form-group">
                      <label className="font-bold">Email</label>
                      <input
                        disabled
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="abc@email.com"
                        className="form-control pink"
                      />
                    </div>
                    <div className="form-group">
                      <label className="font-bold">Name</label>
                      <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="abcde------"
                        className="form-control pink"
                      />
                    </div>
                    <div className="form-group">
                      <label className="font-bold">Password</label>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="123.........."
                        className="form-control "
                      />
                    </div>

                    <div className="form-group">
                      <label className="font-bold">Phone</label>
                      <input
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="number"
                        placeholder="+123------"
                        className="form-control pink"
                      />
                    </div>
                    <div className="form-group">
                      <label className="font-bold">Address</label>
                      <input
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        type="text"
                        placeholder="Address------"
                        className="form-control pink"
                      />
                    </div>
                    <div className="form-group">
                      <label className="font-bold">Postal Code</label>
                      <input
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        type="text"
                        placeholder="Postal Code------"
                        className="form-control pink"
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="row">
                <div className="col p-3 mb-5 text-center ">
                  <button
                    onClick={update}
                    type="submit"
                    className="btn btn-success text-center  m-3"
                  >
                    Update-Now
                  </button>

                  <hr className="mb-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
