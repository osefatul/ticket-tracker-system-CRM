import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { fetchNewAccessJWT } from "../api/userApi";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { loginSuccess } from "../features/authSlice/loginSlice";
import { getUserProfile } from "../features/SpecificUerSlice/userAction";


export const DefaultLayout = ({ children }) => {


  const dispatch = useDispatch();
  const {isAuth} = useSelector(state=> state.login)
  const {user} = useSelector(state=> state.user)
  const location = useLocation()

  useEffect(()=>{
  const updateAccessJWT = async () => {
    const result = await fetchNewAccessJWT();
    result && dispatch(loginSuccess());
  };

  !user._id && dispatch(getUserProfile());

  !sessionStorage.getItem("accessJWT") &&
    localStorage.getItem("crmSite") &&
    updateAccessJWT();

  !isAuth && sessionStorage.getItem("accessJWT") && dispatch(loginSuccess());
}, [dispatch, isAuth, user._id]);


  return (
    <div className="default-layout">
      <header className="header mb-2">
        <Header />
      </header>

      {isAuth? (<main className="h-main flex items-center justify-center mx-auto w-[80%]">
        <Outlet />
      </main>): <Navigate to="auth" state={{from: location}} replace/>
    }

      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};