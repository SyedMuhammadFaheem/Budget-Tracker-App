import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

function PrivateRoute() {
  const [auth, setAuth] = useState(null);
  const {id} = useParams()
  useEffect(() => {
    const fetchData = async () => {
      const user = Cookies.get("user");
      if (user) {
        const [blankId, pass] = user.split(":");
        const data = {
          id: id,
        };
        try {
          const response = await axios.post(
            "http://localhost:3001/user/get-password",
            data
          );
          const resPass = response.data.password;
          if (resPass === pass) {
            setAuth(true);
          } else {
            setAuth(false);
          }
        } catch (error) {
          console.error(error);
          setAuth(false);
        }
      } else {
        setAuth(false);
      }
    };

    fetchData();
  }, []);

  if (auth === null) {
    return null;
  } else if (auth) {
    return <Outlet />;
  } else {
    return <Navigate to="/user/login" />;
  }
}

export default PrivateRoute;
