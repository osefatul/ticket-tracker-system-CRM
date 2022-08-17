import React from 'react'
import { useSelector } from "react-redux";
import UserEdit from '../../../pages/UserEdit';

function Settings() {

    const {user} = useSelector(state => state.user)


    return (
        <div className="flex flex-col sm:flex-row pl-4 pt-4 items-center justify-center sm:items-start sm:justify-start">

            <div className=' text-black text-[12px] flex flex-col items-start justify-start boxShadow w-60 pl-4 pt-2  space-y-6'>

                <div className='flex '>
                    <div className="flex items-center justify-center rounded-full bg-slate-300 w-10 h-10 text-[20px]"> {user?.name?.charAt(0).toUpperCase()}</div>
                    <h1 className='pl-2 text-[13px] font-bold'>{user.name}</h1>
                </div>
                

                <h2 className='text-slate-400 text-[14px]'>Account Details</h2>
                <div>
                
                </div>
            </div>
            
            <div>

            </div>
        </div>
            


        );
}

export default Settings