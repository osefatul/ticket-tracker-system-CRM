import React from 'react'
import { useState } from 'react';

function ResetPassword() {

    const passwordVerificationError = {
        isLengthy: false,
        hasUpper: false,
        hasLower: false,
        hasNumber: false,
        hasSpecialChar: false,
        confirmPassword: false,
    }
    const [passwordError, setPasswordError] = useState(passwordVerificationError);
    











    return (
        <div className=" h-screen flex flex-col items-center justify-center bg-slate-800 space-x-2">

        

        
        <div className="space-y-3">
            <p>
                PASSWORD OTP
            </p>
            </div>

            <form
            >
            <div className="text-[13px]">
            <label
            
                htmlFor="email"
            >
                Email
            </label>
            <input
                className="placeholder:italic placeholder:text-slate-400 placeholder:pl-2
                block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                name="email"
                type="email"
                placeholder="Email@gmail.com"
            
                required
                />
            </div>



            <div className="text-[13px]">
                <label htmlFor="password">Password</label>
                <input
                    className=" placeholder:italic placeholder:text-slate-400 placeholder:pl-2
                    block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                    focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 "
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                />
            </div>



                <div className="text-[13px]">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                    className=" placeholder:italic placeholder:text-slate-400 placeholder:pl-2
                    block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                    focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 "
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    required
                    />
                </div>

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
                        </div>



            <div >
            <button 
            className="mx-auto flex items-center justify-center"
            type ="submit"
            >
                SUBMIT
            </button>
            </div>
        </form>


    
        </div>
)
}

export default ResetPassword