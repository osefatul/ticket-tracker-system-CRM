import React, { useState } from "react";
// import Cookies from "universal-cookie";
// import axios from "axios";
// import signinImage from "../assets/signup.jpg";
// const cookies = new Cookies();

const initialState = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

function Auth() {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, username, password } = form;
    console.log(email, username, password);

    //  const {
    //   data: { token, userId, hashedPassword, fullName },

    // } = await axios.post(`${URL}/${isSignup ? "signup" : "login"}`, {
    //   username,
    //   password,
    //   fullName: form.fullName,
    //   phoneNumber,
    //   avatarURL,
    // });

    // if (isSignup) {
    //   cookies.set("phoneNumber", phoneNumber);
    //   cookies.set("avatarURL", avatarURL);
    //   cookies.set("hashedPassword", hashedPassword);
    // }
    // window.location.reload();
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="space-y-3">
        <p className="text-green-800 font-bold text-[35px] flex items-center justify-center">
          {isSignup ? "Sign Up" : "Sign In"}
        </p>
        <form
          className="space-y-4 flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div className=" ">
            <label htmlFor="fullName">Email</label>
            <input
              className="placeholder:italic placeholder:text-slate-400 block text-slate-700 bg-white rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm placeholder:pl-1 "
              name="email"
              type="text"
              placeholder="Email@gmail.com"
              onChange={handleChange}
              required
            />
          </div>

          {isSignup && (
            <div className="">
              <label htmlFor="username">Username</label>
              <input
                className=" placeholder:italic placeholder:text-slate-400  text-slate-700 block bg-white rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm placeholder:pl-1"
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="">
            <label htmlFor="password">Password</label>
            <input
              className=" placeholder:italic placeholder:pl-1 placeholder:text-slate-400 block text-slate-700 bg-white rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
          {isSignup && (
            <div className="">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                className="placeholder:italic placeholder:pl-1 placeholder:text-slate-400 block text-slate-700 bg-white rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="border rounded-lg w-32 bg-green-900">
            <button className="mx-auto flex items-center justify-center">
              {isSignup ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </form>
        {isSignup ? (
          ""
        ) : (
          <div className="text-[12px] text-sky-500 flex items-center justify-center">
            <a href="#!">Forget Password?</a>
          </div>
        )}

        <div className="">
          <p>
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <span className="text-blue-900 cursor-pointer" onClick={switchMode}>
              {isSignup ? " Sign In" : " Sign Up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
