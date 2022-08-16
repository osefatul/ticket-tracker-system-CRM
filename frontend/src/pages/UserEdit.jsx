import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Sidebar from '../components/Homepage/Sidebar'
import { motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUserInfoOnEdit } from '../features/SpecificUerSlice/userAction'


function UserEdit() {

    const {uid} = useParams();
    const dispatch = useDispatch();

    const {selectedUser} = useSelector(state => state.user)
    console.log(selectedUser);
    
    useEffect(() => {
        dispatch(getUserInfoOnEdit(uid))
    },[])






return (
    <div>
        <Header />
        <div className="layout w-[100%] text-black flex items-center justify-center">

        <div className='flex flex-col items-center justify-center space-y-16 '>
            <h1 className="text-slate-800 font-bold border-b border-amber-600 shadow-lg text-[30px]">Edit User Details</h1>
            
            <form action="" >
                <div className='grid grid-cols-2 gap-4 text-slate-800'>

                <div className="text-[11px]">
                    <label
                    // className={`${resetPassword ? "mb-2" : ""}`}
                    htmlFor="name"
                    >
                    Username
                    </label>
                    <input
                    className={` placeholder:italic border-2 placeholder:text-slate-800 placeholder:pl-2
                    block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                    focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1`}
                    name="name"
                    type="text"
                    placeholder={`${selectedUser.name}`}
                    // onChange={handleChange}
                    // value={form.email}
                    required
                    />
                </div>

                <div className="text-[11px]">
                    <label
                    // className={`${resetPassword ? "mb-2" : ""}`}
                    htmlFor="email"
                    >
                    Email
                    </label>
                    <input
                    className={`placeholder:italic border-2 placeholder:text-slate-800 placeholder:pl-2
                    block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                    focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1`}
                    name="email"
                    type="email"
                    placeholder={`${selectedUser.email}`}
                    // onChange={handleChange}
                    // value={form.email}
                    required
                    />
                </div>

                <div className="text-[11px]">
                    <label
                    // className={`${resetPassword ? "mb-2" : ""}`}
                    htmlFor="department"
                    >
                    Department
                    </label>
                    <input
                    className={`placeholder:italic border-2 placeholder:text-slate-800 placeholder:pl-2
                    block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                    focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1`}
                    name="department"
                    type="text"
                    placeholder={`${selectedUser.department}`}

                    // onChange={handleChange}
                    // value={form.email}
                    required
                    />
                </div>

                <div className="text-[11px]">
                    <label
                    // className={`${resetPassword ? "mb-2" : ""}`}
                    htmlFor="company"
                    >
                    Company
                    </label>
                    <input
                    className={`placeholder:italic border-2 placeholder:text-slate-800 placeholder:pl-2
                    block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                    focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1`}
                    name="company"
                    type="text"
                    placeholder={`${selectedUser.company}`}

                    // onChange={handleChange}
                    // value={form.email}
                    required
                    />
                </div>

                <div className="text-[11px]">
                    <label
                    // className={`${resetPassword ? "mb-2" : ""}`}
                    htmlFor="address"
                    >
                    Address
                    </label>
                    <input
                    className={`placeholder:italic border-2 placeholder:text-slate-800 placeholder:pl-2
                    block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                    focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1`}
                    name="address"
                    type="text"
                    placeholder={`${selectedUser.address? selectedUser.address: "Please enter your add"}`}

                    // onChange={handleChange}
                    // value={form.email}
                    required
                    />
                </div>

                <div className="text-[11px]">
                    <label
                    // className={`${resetPassword ? "mb-2" : ""}`}
                    htmlFor="phone"
                    >
                    Phone
                    </label>
                    <input
                    className={`placeholder:italic border-2 placeholder:text-slate-800 placeholder:pl-2
                    block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                    focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1`}
                    name="phone"
                    type="number"
                    placeholder={`${selectedUser.phone? selectedUser.phone: "Please enter phone#"}`}

                    // onChange={handleChange}
                    // value={form.email}
                    required
                    />
                </div>


                <div>
                    <label htmlFor="isVerified">isVerified?</label>
                    <select 
                    name="isVerified" 
                    id="isVerified" 
                    defaultValue
                    
                    className={`placeholder:italic border-2 placeholder:text-slate-800 placeholder:pl-2
                    block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                    focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1`}
                    >
                        <option disabled value> {`${selectedUser.isVerified}`} </option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>

                    </select>
                </div>


                <div>
                    <label htmlFor="isAdmin">isAdmin?</label>
                    <select 
                    name="isAdmin" 
                    id="isAdmin" 
                    defaultValue 
                    className={`placeholder:italic border-2 placeholder:text-slate-400 placeholder:pl-2
                    block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                    focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1`}
                    >
                        <option disabled value>{`${selectedUser.isAdmin}`}</option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>

                    </select>
                </div>
                </div>

                <motion.div className="flex items-center justify-center pt-12"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.9 }}
                >
                <button 
                type="submit" 
                className=" text-slate-100 rounded-md bg-green-800 w-32 h-10"
            
                >
                    Submit
                </button>

                </motion.div>


            </form>
        </div>
        </div>
        <Footer/>
    </div>
)
}

export default UserEdit