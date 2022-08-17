import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Sidebar from '../components/Homepage/Sidebar'
import { motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUserInfoOnEdit, UpdateUserInfoOnEdit } from '../features/SpecificUerSlice/userAction'
import PageBreadCrumbs from '../components/PageBreadCrumbs'



//for Data submission
const initialFormData = {
    name: "",
    email: "",
    company: "",
    department: "",
    phone: "",
    address: "",
};

function UserEdit() {

    const {selectedUser, selectedUserAfterEdit} = useSelector(state => state.user)
    const [formData, setFormData] = useState(selectedUser);
    const [submit, setSubmit] = useState(false);
    const {uid} = useParams();
    const dispatch = useDispatch();


    // console.log(selectedUserAfterEdit)
    

    useEffect(() => {
        dispatch(getUserInfoOnEdit(uid))
    },[dispatch, selectedUserAfterEdit])


    useEffect(()=>{
        setTimeout(()=>{
            setSubmit(false)
        },5000)
    },[submit])



    const handleChange =  (e) =>{
        const {name, value} = e.target;

        setFormData({...formData, 
            [name]: name ==="isVerified" || name === "isAdmin" ? Boolean(value) : value })
            console.log(formData)

    }



    const handleOnSubmit = (e)=>{
        e.preventDefault();

        try {
            dispatch(UpdateUserInfoOnEdit(uid, formData))
            setSubmit(true)
        }catch(error){
            console.log(error.message)
        }


    }

return (
    <div>
        <Header />
        <div className="layout w-[80%] text-black ">

        <div className='pt-5 sm:pl-16'>
        <PageBreadCrumbs page="Edit User"/>
        </div>

        {submit && <h2 className="flex items-center justify-center text-green-500 text-12px">Profile Updated Successfully</h2>}

        <div className='flex flex-col items-center justify-center space-y-10 '>
            <h1 className="text-slate-800 font-bold border-b border-amber-600 shadow-lg text-[30px]">Edit User Details</h1>

            
            
            <form action="" onSubmit={handleOnSubmit} >
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-800'>

                <div className="text-[11px]">
                    <label
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
                    onChange={handleChange}
                    value={formData.name}
                    />
                </div>

                <div className="text-[11px]">
                    <label
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
                    onChange={handleChange}
                    value={formData.email}
                    />
                </div>

                <div className="text-[11px]">
                    <label
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
                    onChange={handleChange}
                    value={formData.department}
                    />
                </div>

                <div className="text-[11px]">
                    <label
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

                    onChange={handleChange}
                    value={formData.company}
        
                    />
                </div>

                <div className="text-[11px]">
                    <label
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
                    onChange={handleChange}
                    value={formData.address}
                    />
                </div>

                <div className="text-[11px]">
                    <label
                    htmlFor="dob"
                    >
                    Date of Birth
                    </label>
                    <input
                    className={` placeholder:italic border-2 placeholder:text-slate-800 placeholder:pl-2
                    block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                    focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1`}
                    name="dob"
                    type="date"
                    onChange={handleChange}
                    // value={formData.dob}
                    />
                </div>


                <div className="text-[11px]">
                    <label
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
                    onChange={handleChange}
                    value={formData.phone}
                    />
                </div>


                <div className="text-[11px]">
                    <label htmlFor="isVerified">isVerified?</label>
                    <select 
                    name="isVerified" 
                    id="isVerified" 
                    defaultValue
                    onChange={handleChange}
                    className={`placeholder:italic border-2 placeholder:text-slate-800 placeholder:pl-2
                    block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                    focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1`}
                    >
                        <option disabled value> {`${selectedUser.isVerified}`} </option>
                        <option value="" >No</option>
                        <option value="1">Yes</option>

                    </select>
                </div>


                <div className="text-[11px]">
                    <label htmlFor="isAdmin">isAdmin?</label>
                    <select 
                    name="isAdmin" 
                    id="isAdmin"
                    onChange={handleChange}
                    defaultValue 
                    className={`placeholder:italic border-2 placeholder:text-slate-400 placeholder:pl-2
                    block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
                    focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1`}
                    >
                        <option disabled value>{`${selectedUser.isAdmin}`}</option>
                        <option value="" >No</option>
                        <option value="1">Yes</option>

                    </select>
                </div>
                </div>

                <motion.div className="flex items-center justify-center pt-8"
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