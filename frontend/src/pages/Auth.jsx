import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate  } from "react-router-dom";
import { userLogin, userRegistration } from "../api/userApi";
import { loginFail, loginSuccess, loginPending} from "../features/authSlice/loginSlice";
import { registrationPending, registrationSuccess, registrationError} from "../features/authSlice/registrationSlice";
// Spinner
import Spinner from "../utils/spinner"
import { getUserProfile } from "../features/SpecificUerSlice/userAction";


const initialState = {
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
  phone: ""
};

function Auth() {
  
  const dispatch = useDispatch();
	const navigate = useNavigate ();
  const location = useLocation ();

  //When we want to access a page, but is restricted by login, we will be redirected to login page, once we loge in then we will be redirected back to where we wanted to go.
  const from = location.state?.from?.pathname || "/"

  const {isLoading, isAuth, error,} = useSelector(state => state.login)
  const {isLoading:regLoading, status, message,} = useSelector(state => state.registration)
  
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);
  const [resetPassword, setResetPassword] = useState(false);


//When the auth page renders check for accessJWT
  useEffect(() => {
		sessionStorage.getItem("accessJWT") && navigate(from , {replace:true})
	}, [navigate, isAuth]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value },);
    // console.log(form);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { email, name, password, confirmPassword, phone, company } = form;
    try {
      
      //Sign In form
      if (!isSignup){
        dispatch(loginPending())
        const isAuth = await userLogin({email, password});

        // if we receive unsuccessful response then
        const AuthResponse = isAuth?.response?.data?.message
        if (AuthResponse){
          // console.log(AuthResponse)
          return dispatch(loginFail(AuthResponse))
        }

        //console.log(isAuth)
        dispatch(loginSuccess());
        dispatch(getUserProfile())
        navigate("/")
      } 


      
      // SignUp form
      if(isSignup){
        dispatch(registrationPending())
        const isRegistered = await userRegistration({email, name, phone, company,  password, confirmPassword})

        //Error
        const  regResponse = isRegistered?.response?.data?.error
        if(regResponse){
          console.log(regResponse)
          return dispatch(registrationError(regResponse))
        }
        setIsSignup(!isSignup)
        return dispatch(registrationSuccess(isRegistered));
      }
      
    }catch(error) {
      console.log(error.message)
      return (error.message)
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
                name="name"
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
          ) : isSignup ? (
            <div>

            <div className="">
              <label htmlFor="username">Mobile Number</label>
              <input
                className=" placeholder:italic placeholder:text-slate-400 placeholder:pl-2
                block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 "
                name="phone"
                type = 'number'
                placeholder="Eg: +1 778957689"
                onChange={handleChange}
                required
                />
            </div>
            <div className="mt-2">
              <label htmlFor="username">Company</label>
              <input
                className=" placeholder:italic placeholder:text-slate-400 placeholder:pl-2
                block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 "
                name="company"
                type="text"
                placeholder="Company"
                onChange={handleChange}
                required
              />
            </div>
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
                  isLoading || regLoading ? (
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
