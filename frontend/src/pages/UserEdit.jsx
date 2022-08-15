import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Sidebar from '../components/Homepage/Sidebar'
import { motion } from "framer-motion"

function UserEdit() {
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
                    className={`placeholder:italic border-2 placeholder:text-slate-400 placeholder:pl-2
                    block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                    focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1`}
                    name="name"
                    type="text"
                    placeholder="Ex: Mike"
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
                    className={`placeholder:italic border-2 placeholder:text-slate-400 placeholder:pl-2
                    block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                    focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1`}
                    name="email"
                    type="email"
                    placeholder="Email@gmail.com"
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
                    className={`placeholder:italic border-2 placeholder:text-slate-400 placeholder:pl-2
                    block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                    focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1`}
                    name="department"
                    type="text"
                    placeholder="Ex. SDE"
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
                    className={`placeholder:italic border-2 placeholder:text-slate-400 placeholder:pl-2
                    block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                    focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1`}
                    name="company"
                    type="text"
                    placeholder="Enter company name"
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
                    className={`placeholder:italic border-2 placeholder:text-slate-400 placeholder:pl-2
                    block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                    focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1`}
                    name="address"
                    type="text"
                    placeholder="Enter Your Address"
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
                    Address
                    </label>
                    <input
                    className={`placeholder:italic border-2 placeholder:text-slate-400 placeholder:pl-2
                    block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                    focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1`}
                    name="phone"
                    type="number"
                    placeholder="Ex: +1 778 957 5786"
                    // onChange={handleChange}
                    // value={form.email}
                    required
                    />
                </div>

                <div>
                    <label htmlFor="isVerified">isVerified?</label>
                    <select name="isVerified" id="isVerified" defaval className={`placeholder:italic border-2 placeholder:text-slate-400 placeholder:pl-2
                    block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                    focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1`}
                    >
                        <option disabled value>- Choose Value -</option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>

                    </select>
                </div>

                <div>
                    <label htmlFor="isAdmin">isAdmin?</label>
                    <select name="isAdmin" id="isAdmin" defaval className={`placeholder:italic border-2 placeholder:text-slate-400 placeholder:pl-2
                    block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                    focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1`}
                    >
                        <option disabled value>- Choose Value -</option>
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