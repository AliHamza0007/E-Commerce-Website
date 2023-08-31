import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Outlet } from "react-router-dom";
import Spinner from "./Spinner";

function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();
  useEffect(() => {
    const AuthCheck = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_API}/api/v1/auth/user-auth`,
        {
          headers: { Authorization: auth?.token },
        }
      );

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

export default PrivateRoute;
