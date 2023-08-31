import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
// import { toast } from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { Modal } from "antd";
import { toast } from "react-hot-toast";
const User = () => {
  const [users, setUsers] = useState([]);
  const [auth] = useAuth();
  const [visible, setVisible] = useState(false);
  //for updtae targeted user
  const [id, setId] = useState("");

  //update user procedure
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [password, setPassword] = useState("");
  //update user procedure
  const getUsers = async () => {
    let result = await fetch(
      `${process.env.REACT_APP_API}/api/v1/auth/get-users`,
      { method: "GET", headers: { Authorization: auth?.token } }
    );
    result = await result.json();
    if (result?.success) setUsers(result.result);

    // console.warn(result);
  };

  const removeUser = async (id) => {
    // console.log(id)
    const confirm = window.confirm("Are You Really Want to Delete");
    if (confirm) {
      let result = await fetch(
        `${process.env.REACT_APP_API}/api/v1/auth/delete-user/${id}`,
        { method: "delete", headers: { Authorization: auth?.token } }
      );
      result = await result.json();
      // console.log(result);
      if (result?.success) {
        getUsers();
        toast.success(result.message);
      } else {
        // console.log("Error in Deletion");
      }
    }
  };
  const searchUser = async (e) => {
    e.preventDefault();
    let key = e.target.value;
    if (key) {
      let result = await fetch(
        `${process.env.REACT_APP_API}/api/v1/auth/search-user/${key}`,
        {
          headers: { Authorization: auth?.token },
        }
      );
      result = await result.json();
      if (result?.success) {
        setUsers(result.result);
      } else {
        getUsers();
      }
    } else {
      getUsers();
    }
  };
  useEffect(() => {
    getUsers();
    //eslint-disable-next-line
  }, []);

  //update user procedure starts here

  // now starts updates single user
  async function getSingleUser(id) {
    let result = await fetch(
      `${process.env.REACT_APP_API}/api/v1/auth/single-user/${id}`,
      { method: "get", headers: { Authorization: auth?.token } }
    );
    result = await result.json();
    // console.log(result.singleProduct);
    if (result?.success) {
      setName(result?.result?.name);
      setPhone(result?.result?.phone);
      setAddress(result?.result?.address);
      setPostalCode(result?.result?.postalCode);
      setEmail(result?.result?.email);
      setId(result?.result?._id);
    }
    // console.log(category);
  }
  //save user update

  const updateUser = async () => {
    try {
      // console.log(id);
      if (!name || !phone || !address || !email || !postalCode) {
        toast.error("please Fill and select required Things ");
      } else {
        const user = { name, phone, address, password, postalCode };

        let result = await fetch(
          `${process.env.REACT_APP_API}/api/v1/auth/user-update/${id}`,
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
        if (result?.success) {
          toast.success(result?.message);
          getUsers();
        } else {
          toast.error(result.message);
        }
      }
    } catch (error) {
      toast.error("something went wrong in updating user");
      // console.log(error);
    }
  };
  return (
    <Layout title={"Admin Dashboard Manage Users"}>
      <div className="container-fluid">
        <AdminMenu />
        <div className="row">
          <div className="col-md-12 col  ">
            <div className="text-center my-4">
              <h1>Manage User</h1>

              <div className="row  py-1 ">
                <div className="col text-center">
                  {users?.length} Users Available
                  <input
                    className=" form-control m-1 px-3"
                    onChange={searchUser}
                    type="text"
                    placeholder="Search User"
                  />
                </div>
              </div>
              <div className="row py-2">
                <div className=" col table-responsive p-1">
                  <table className=" table  table-light table-bordered border-primary table-striped">
                    <thead>
                      <tr>
                        <th>createdAt</th>
                        <th>Name</th>
                        <th>email</th>
                        <th>phone</th>
                        <th>Address</th>
                        <th>Postal Code</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users?.length > 0 ? (
                        users.map((user, i) => (
                          <tr key={i}>
                            <td>{user.createdAt}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.address}</td>
                            <td>{user.postalCode}</td>
                            <td>
                              <button
                                className="btn btn-warning p-2 m-1"
                                onClick={() => {
                                  setVisible(true);
                                  getSingleUser(user._id);
                                }}
                              >
                                Edit
                              </button>
                              {/* *******************************update users Starts **************************************************************/}
                              <Modal
                                onCancel={() => setVisible(false)}
                                footer={null}
                                open={visible}
                              >
                                <div className=" text-center py-1 ">
                                  <h1>Update User</h1>

                                  <input
                                    className="form-control m-1 px-1"
                                    type="email"
                                    value={email}
                                    disabled={true}
                                  />
                                  <input
                                    className="form-control m-1 px-1"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter Name.."
                                  />
                                  <input
                                    className="form-control m-1 px-1"
                                    type="text"
                                    value={password}
                                    onChange={(e) =>
                                      setPassword(e.target.value)
                                    }
                                    placeholder="Enter Password.."
                                  />
                                  <input
                                    className="form-control m-1 px-1"
                                    type="number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Enter Phone.."
                                  />
                                  <input
                                    type="text"
                                    className="form-control m-1 px-1"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Enter address.."
                                  />
                                  <input
                                    type="text"
                                    className="form-control m-1 px-1"
                                    value={postalCode}
                                    onChange={(e) =>
                                      setPostalCode(e.target.value)
                                    }
                                    placeholder="Enter Postal CODE.."
                                  />
                                  <button
                                    onClick={() => {
                                      setVisible(false);
                                      updateUser(user._id);
                                    }}
                                    className="btn btn-primary px-1 "
                                  >
                                    Update
                                  </button>
                                </div>
                              </Modal>

                              {/* *******************************update users ending **************************************************************/}
                              <button
                                onClick={() => removeUser()}
                                className="btn btn-danger p-2 m-1"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="text-center mt-5 ">Users Not Found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default User;
