import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../features/passwordResetSlice/passwordResetAction';
import Spinner from '../utils/spinner';



const initialState = {
    pin: "",
    password: "",
    confirmPassword: "",
    };

const passwordVerificationError = {
    isLengthy: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpecialChar: false,
    confirmPassword: false,
}



function ResetPassword() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {isLoading, status, message, email} = useSelector(state => state.resetPassword)


    const[MessageAddedAlert, setMessageAddedAlert] = useState(false)
    const [form, setForm] = useState(initialState);
    const [passwordError, setPasswordError] = useState(passwordVerificationError);
    

    //Make the message disappear
    useEffect(()=>{
    setTimeout(()=>{
        setMessageAddedAlert(false);
    },5000)
    },[MessageAddedAlert])



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
    
    };

    const handleSubmit = (e) =>{
        e.preventDefault()
        const {pin, password} = form

        try {
        dispatch (updatePassword({pin, newPassword:password, email}))
        setMessageAddedAlert(true)//To turn on message alert
        setForm(initialState)

        //Navigate to next page after 5 sec
        setTimeout(()=>{
            status === 'success' && navigate('/')
        },5000)


        }catch (error){
            console.log(error.message)
        }
    }

    return (
        <div className=" h-screen flex flex-col items-center justify-center bg-slate-800 space-x-2">

        
        <div className="space-y-3">
            
            <p className='text-green-800 font-bold text-[25px] sm:text-[30px] mb-12'>
                Update Password
            </p>

            {/* Post Form Submission  */}
            {MessageAddedAlert && <div className="text-green-700 text-small rounded flex items-center justify-center m-3">{message}</div>}
        

            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center space-y-2 '>

                <div className="text-[13px] mb-6">
                <label htmlFor="pin"
                >
                Pin
                </label>
                <input
                    className="placeholder:italic placeholder:text-slate-400 placeholder:pl-2
                    block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                    focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                    name="pin"
                    type="text"
                    placeholder="Type OTP Pin Code ..."
                    value={form.pin}
                    onChange={handleChange}
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
                        value={form.password}
                        onChange={handleChange}
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
                    value={form.confirmPassword}
                    onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col items-start justify-center mt-2">
                    
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
                    className={`mx-auto flex items-center justify-center border rounded-lg  w-32 mt-5  bg-green-800 disabled:opacity-50 disabled:cursor-default `}
                    type ="submit"
                    disabled ={Object.values(passwordError).includes(false)}
                    >
                        SUBMIT {" "} 
                        {isLoading && <Spinner/>}
                    </button>
                </div>
            </form>

        </div>

    </div>
)
}

export default ResetPassword