import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "./Spinner";
import { useAuth } from "../context/auth";

function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();
  useEffect(() => {
    const AuthCheck = async () => {
      let result = await fetch(
        `${process.env.REACT_APP_API}/api/v1/auth/admin-auth`,
        {
          headers: { Authorization: auth?.token },
        }
      );
      result = await result.json();
      if (result.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) AuthCheck();
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner path="" />;
}

export default AdminRoute;
