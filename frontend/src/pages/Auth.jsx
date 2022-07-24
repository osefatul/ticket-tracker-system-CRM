import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate , useLocation } from "react-router-dom";
import { userLogin } from "../api/userApi";
import { loginFail, loginSuccess, loginPending} from "../features/loginSlice/loginSlice";
import { fetchAllTickets } from "../features/ticketSlice/ticketAction";

// Spinner
import Spinner from "../utils/spinner"


const initialState = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

function Auth() {

  const {isLoading, isAuth, error,} = useSelector(state => state.auth)

  const dispatch = useDispatch();
	const navigate = useNavigate ();
	let location = useLocation();

  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);
  const [resetPassword, setResetPassword] = useState(false);

  useEffect(() => {
    dispatch(fetchAllTickets())
  },[])


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginPending())

    const { email, username, password } = form;
    console.log(email, username, password);

    try {
      const isAuth = await userLogin({email, password});
      
      if (isAuth.status === "error") {
        return dispatch(loginFail(error))
      }

      dispatch(loginSuccess());
      navigate("/dashboard")
      
    }catch(error) {
      dispatch(loginFail(error.message))
    }  
  };

  //########## SWITCH FUNCTIONS ######################################
  const SignUpSwitchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };
  const ResetPasswordSwitchMode = () => {
    // setResetPassword((prevResetPassword) => !prevResetPassword);
    setResetPassword(true);
  };

  //this will bring user back to signup page
  const BacktoLogin = () => {
    setResetPassword(false);
    setIsSignup(false);
    // window.location.reload();
  };
  //#################################################################

  return (
    <div className="h-screen flex items-center justify-center bg-slate-800 ">
      <div className="space-y-3">
        <p
          className={`text-green-800 font-bold text-[35px] flex items-center justify-center ${
            resetPassword ? "mb-2" : " "
          }`}
        >
          {resetPassword ? "Reset Password" : isSignup ? "Sign up" : "Sign in"}
        </p>
        {error? 
        <div className="flex justify-center items-center text-orange-700">
          {error}
        </div>
        : "" }
        <form
          className={`space-y-4 ${
            resetPassword ? "" : "flex flex-col justify-center items-center"
          }`}
          onSubmit={handleSubmit}
        >
          <div>
            <label
              className={`${resetPassword ? "mb-2" : ""}`}
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`placeholder:italic placeholder:text-slate-400 placeholder:pl-2
              block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
              focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1   ${
                resetPassword ? "mt-2" : ""
              }`}
              name="email"
              type="email"
              placeholder="Email@gmail.com"
              onChange={handleChange}
              required
            />
          </div>


          {resetPassword ? (
            ""
          ) : isSignup ? (
            <div className="">
              <label htmlFor="username">Username</label>
              <input
                className=" placeholder:italic placeholder:text-slate-400 placeholder:pl-2
                block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 "
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>
          ) : (
            ""
          )}


          {resetPassword ? (
            ""
          ) : (
            <div className="">
              <label htmlFor="password">Password</label>
              <input
                className=" placeholder:italic placeholder:text-slate-400 placeholder:pl-2
                block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 "
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
          )}


          {resetPassword
            ? ""
            : isSignup && (
                <div className="">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    className=" placeholder:italic placeholder:text-slate-400 placeholder:pl-2
                    block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                    focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 "
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    required
                  />
                </div>
              )}



          <div className={`border rounded-lg ${resetPassword? "w-44": "w-32"} bg-green-900`}>
            <button className="mx-auto flex items-center justify-center">
              {/* Check which form we are filling */}
              {resetPassword
                ? "Reset Password"
                : isSignup
                ? "Sign Up"
                : "Sign In"}
                {/* If form submitted and it is loading then add spinner*/}
                {
                  isLoading ? (
                    < Spinner />
                  ): " "}
            </button>
          </div>
        </form>


        {resetPassword ? (
          <div className="text-[12px] text-sky-500 ">
            <a href="#!" onClick={BacktoLogin}>
              Login Now
            </a>
          </div>
        ) : isSignup ? (
          ""
        ) : (
          <div className="text-[12px] text-sky-500 flex items-center justify-center">
            <a href="#!" onClick={ResetPasswordSwitchMode}>
              Forget Password?
            </a>
          </div>
        )}


        {!resetPassword && (
          <div className="">
            <p>
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <span
                className="text-sky-500 cursor-pointer"
                onClick={SignUpSwitchMode}
              >
                {isSignup ? " Sign in" : " Sign up"}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Auth;
