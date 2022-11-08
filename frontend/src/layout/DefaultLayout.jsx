import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { fetchNewAccessJWT } from "../api/userApi";
import { loginSuccess } from "../features/authSlice/loginSlice";
import { getUserProfile } from "../features/SpecificUerSlice/userAction";


export const DefaultLayout = ({ children }) => {


  const location = useLocation()
  const dispatch = useDispatch();
  
  const {isAuth} = useSelector(state=> state.login)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [userToken, setUserToken] = useState(localStorage.getItem('accessJWT'));
  
  useEffect(() => {
      if(user && userToken) dispatch(loginSuccess(user));

  },[user, userToken])


  return (
    <div>
    {user? (
        <main>
            <Outlet/>
        </main>
    ):
    <Navigate to="auth" state={{from:location}} replace/>
    }
</div>
  );
};