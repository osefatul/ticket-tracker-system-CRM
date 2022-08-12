import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate  } from "react-router-dom";
import { userLogin, userRegistration } from "../api/userApi";
import { loginFail, loginSuccess, loginPending} from "../features/authSlice/loginSlice";
import { registrationPending, registrationSuccess, registrationError} from "../features/authSlice/registrationSlice";
// Spinner
import Spinner from "../utils/spinner"
import { getUserProfile } from "../features/SpecificUerSlice/userAction";
import { sendPasswordResetOtp } from "../features/passwordResetSlice/passwordResetAction";
import { otpReqPending } from "../features/passwordResetSlice/passwordResetSlice";


const initialState = {
  email: "",
  name: "",
  company: "",
  password: "",
  confirmPassword: "",
  department: "",
};

function Auth() {
  
  const dispatch = useDispatch();
	const navigate = useNavigate ();
  const location = useLocation ();

  //When we want to access a page, but is restricted by login, we will be redirected to login page, once we loge in then we will be redirected back to where we wanted to go.
  const from = location.state?.from?.pathname || "/"

  const {isLoading, isAuth, error,} = useSelector(state => state.login)
  const {isLoading:regLoading, status, message,} = useSelector(state => state.registration)
  const {
    isLoading:resetLoading, 
    status:resetPasswordStatus, 
    message:resetPasswordMessage,} = useSelector(state => state.resetPassword)


  const[MessageAddedAlert, setMessageAddedAlert] = useState(false)
  
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);
  const [resetPassword, setResetPassword] = useState(false);



  //FOR STRONG PASSWORD
  const passwordVerificationError = {
    isLengthy: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpecialChar: false,
    confirmPassword: false,
  }
  const [passwordError, setPasswordError] = useState(passwordVerificationError);



//Make the message disappear
  useEffect(()=>{
  setTimeout(()=>{
    setMessageAddedAlert(false);
  },5000)
  },[MessageAddedAlert])



//When the auth page renders check for accessJWT
  useEffect(() => {
		sessionStorage.getItem("accessJWT") && navigate(from , {replace:true})
	}, [navigate, isAuth]);




//WHEN FORM INPUTS UPDATE
  const handleChange = (e) => {
    const {name, value} = e.target
    setForm({ ...form, [name]: value },);

    
    //Password verificationError
    if(name === "password"){
      const isLengthy = value.length > 8;
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecialChar = /[!,@,#,$,%,&]/.test(value);
      
      setPasswordError({
        ...passwordError,
        isLengthy,
        hasUpper,
        hasLower,
        hasNumber,
        hasSpecialChar,
      });
    }
    
    if (name === "confirmPassword") {
      setPasswordError({
        ...passwordError,
        confirmPassword: form.password === value,//if yes make it true or false.
      });
    }
    console.log(form)
  };



// SUBMITTING FORM
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { email, name, password, confirmPassword, company, department } = form;
    
    try {

      
      //SIGN IN form
      if (!isSignup && !resetPassword){
        dispatch(loginPending())
        const isAuth = await userLogin({email, password});
        // if we receive unsuccessful response then
        const AuthResponse = isAuth?.response?.data?.message

          //Error
        if (AuthResponse){
          // console.log(AuthResponse)
          setMessageAddedAlert(true)//To turn on message alert
          return dispatch(loginFail(AuthResponse))
        }

        //console.log(isAuth)
        dispatch(loginSuccess());
        dispatch(getUserProfile())
        navigate("/")
      } 

      //------------------------------------------------
      
      // SIGN UP form
      if(isSignup && !resetPassword){
        dispatch(registrationPending())
        const isRegistered = await userRegistration({email, name, department, company,  password, confirmPassword})

        //Error
        const  regResponse = isRegistered?.response?.data?.error
        if(regResponse){
          console.log(regResponse)
          return dispatch(registrationError(regResponse))
        }

        setPasswordError(passwordVerificationError)
        setMessageAddedAlert(true)//To turn on message alert
        setForm(initialState)
        setIsSignup(!isSignup) //To return to sign in

        return dispatch(registrationSuccess(isRegistered));
      }


      //------------------------------------------------

      //REQUEST FOR RESETTING PASSWORD
      if(resetPassword){

        dispatch(sendPasswordResetOtp(email));
        setMessageAddedAlert(true)//To turn on message alert
        navigate("/update-password")
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
    <div className=" h-screen flex flex-col items-center justify-center bg-slate-800 space-x-2">

      {/*Registration Form post submission  */}
      {MessageAddedAlert && <div className=" bg-green-800 w-[80%] text-white text-small rounded flex items-center justify-center m-3">{message}</div>}
      {status ==="error" ? <div className=" bg-red-400 w-[80%] text-white text-small rounded flex items-center justify-center m-2">{message}</div> : ""}


       {/*Password Rest Form post submission  */}
      {MessageAddedAlert && <div className=" bg-green-800 w-[80%] text-white text-small rounded flex items-center justify-center m-3">{resetPasswordMessage}</div>}
      



      <div className="space-y-2">
        <p
          className={` text-green-800 font-bold text-[25px] sm:text-[30px] flex items-center justify-center ${
            resetPassword ? "mb-2" : " "
          }`}
        >
          {resetPassword ? "Reset Password" : isSignup ? "Registration" : "Login"}
        </p>
        {MessageAddedAlert && <div className="flex justify-center items-center text-orange-700">
          {error}
        </div>
        }

        <form
          className={`space-y-3 ${
            resetPassword ? "" : "flex flex-col justify-center items-center"
          }`}
          onSubmit={handleSubmit}
        >
          <div className="text-[13px]">
            <label
              className={`${resetPassword ? "mb-2" : ""}`}
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`placeholder:italic placeholder:text-slate-400 placeholder:pl-2
              ${resetPassword? "w-44": ""}
              block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
              focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1   ${
                resetPassword ? "mt-2" : ""
              }`}
              name="email"
              type="email"
              placeholder="Email@gmail.com"
              onChange={handleChange}
              value={form.email}
              required
            />
          </div>


          {resetPassword ? (
            ""
          ) : isSignup ? (
            <div className="text-[13px]">
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
              
              <div className="text-[13px]">
              <label htmlFor="username">Department</label>
              <input
                className=" placeholder:italic placeholder:text-slate-400 placeholder:pl-2
                block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 "
                name="department"
                type="text"
                placeholder="Department"
                onChange={handleChange}
                required
                value={form.department}
              />
            </div>
            

              <div className="text-[13px] mt-2">
                <label htmlFor="username">Company</label>
                <input
                  className=" placeholder:italic placeholder:text-slate-400 placeholder:pl-2
                  block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                  focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 "
                  name="company"
                  type="text"
                  placeholder="Company"
                  onChange={handleChange}
                  value={form.company}

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
            <div className="text-[13px]">
              <label htmlFor="password">Password</label>
              <input
                className=" placeholder:italic placeholder:text-slate-400 placeholder:pl-2
                block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 "
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                value={form.password}
                required
              />
            </div>
          )}


          {resetPassword
            ? ""
            : isSignup && (
                <div className="text-[13px]">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    className=" placeholder:italic placeholder:text-slate-400 placeholder:pl-2
                    block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                    focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 "
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    value = {form.confirmPassword}
                    required
                  />
                </div>
              )}
              
              {
                    isSignup ? (
                    <div className="flex flex-col items-start justify-center ">
                    
                      <ul className="flex flex-col items-start justify-center text-[10px]">
                        <li
                          className={
                            passwordError.isLengthy ? "text-green-400" : "text-red-400"
                          }
                        >
                          • Min 8 characters
                        </li>
                        <li
                          className={
                            passwordError.hasUpper ? "text-green-400" : "text-red-400"
                          }
                        >
                          • At least one upper case
                        </li>
                        <li
                          className={
                            passwordError.hasLower ? "text-green-400" : "text-red-400"
                          }
                        >
                          • At least one lower case
                        </li>
                        <li
                          className={
                            passwordError.hasNumber ? "text-green-400" : "text-red-400"
                          }
                        >
                          • At least one number
                        </li>
                        <li
                          className={
                            passwordError.hasSpecialChar ? "text-green-400" : "text-red-400"
                          }
                        >
                          • At least one special character.
                        </li>
                      </ul>
                    </div>) 
                    
                    : " "
                }



          <div className={`${resetPassword? "w-44": "w-32"}  `}>
            <button 
            className={`mx-auto flex items-center justify-center border rounded-lg ${resetPassword? "w-44": "w-32"} bg-green-800 disabled:opacity-50 disabled:cursor-default`}
            type ="submit"
            disabled = { isSignup && Object.values(passwordError).includes(false)}
            >
              {/* Check which form we are filling */}
              {resetPassword
                ? "Reset Password"
                : isSignup
                ? "Sign Up"
                : "Sign In"}
                {/* If form submitted and it is loading then add spinner*/}
                {
                  isLoading || regLoading || resetLoading ? (
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
          <div className="text-[13px]">
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
