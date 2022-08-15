import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUsersDepartment } from '../../../features/allUsersSlice/allUsersAction';
import { setModalCloseSuccess } from '../../../features/modalSlice/CloseTicketModalSlice';
import { resetSuccessMSg } from '../../../features/newTicket/newTicketSlice';
import { SendReAssignTicket } from '../../../features/ticketSlice/ticketAction';


//for Data submission
const initialFormData = {
    title: "",
    message: "",
};


function AssignTicket() {

    const { tid} = useParams()
    const dispatch = useDispatch();

    const [formData, setFormData] = useState(initialFormData);
    const [assignee, setAssignee] = useState();
    const [assigneeDepartment, setAssigneeDepartment] = useState("");

    const {user:{name}} = useSelector((state)=> state.user)
    const {isLoading, error, successMsg} = useSelector(state => state.openTicket)
    const {usersAndDepartments} = useSelector(state => state.allUsers)



    //update and dispatch department.
    useEffect(()=>{
        dispatch(fetchUsersDepartment({department: assigneeDepartment}))
    },[assigneeDepartment])



    const handleOnChange = (e) => {
        const { name, value } = e.target;
        
        setFormData({
        ...formData,
        [name]: name ==="severity"? parseInt(value) :value,
        });


        if(name === "department"){
        setAssigneeDepartment(value);
        }

        if(name === "assignee") {
        setAssignee(value);
        }
    };


    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
        //Clear the every dispatch before creating a new ticket
        dispatch(resetSuccessMSg())
        
        //dispatch re-Assign ticket
            dispatch(SendReAssignTicket(tid,
                {...formData, sender:name, assignee, department:assigneeDepartment}))
        
        
        }catch (error){
        console.log(error);
        }
        
        //clear all forms data
        setFormData(initialFormData);
        dispatch(setModalCloseSuccess())

    };

    //Every time formData change run this component
    useEffect(()=>{
        setTimeout(()=>{
        dispatch(resetSuccessMSg())
        },5000)
    },[resetSuccessMSg,error,isLoading,successMsg,])



    return (
        <form action="" onSubmit={handleOnSubmit}>

        <div className="space-y-2 sm:w-[80%] mx-auto">

            <div className="flex justify-center sm:justify-between sm:w-[80%] space-x-10 sm:space-x-5">
                    <label
                        className=" flex justify-start w-[20%] text-[12px]"
                        htmlFor="title"
                    >
                        Department
                    </label>

                    <select
                        className={`pl-1 border-stone-400  border border-1 w-[60%] sm:w-[80%]
                        bg-white rounded-sm shadow-sm sm:text-sm
                        focus:outline-none focus:ring-1
                        }`}
                        name="department"
                        onChange={handleOnChange}
                        defaultValue
                        >
                        <option disabled value>Select dept </option>
                        <option value="HR">HR</option>
                        <option value="IT">IT</option>
                        <option value="SDE">SDE</option>
                        <option value="Finance">Finance</option>
                        <option value="Learning">Learning</option>
                        <option value="Operations">Operations</option>

                    </select>
            </div>


            {usersAndDepartments.length > 0 &&
            <div className="flex justify-center sm:justify-between  sm:w-[80%] space-x-10 sm:space-x-5">
                <label
                    className=" flex justify-start w-[20%] text-[12px]"
                    htmlFor="title"
                >
                    Assignee
                </label>

                <select
                    className={`pl-1 border-stone-400  border border-1 w-[60%] sm:w-[80%]
                    bg-white rounded-sm shadow-sm sm:text-sm
                    focus:outline-none focus:ring-1
                    }`}
                    name="assignee"
                    onChange={handleOnChange}
                    defaultValue
                >
                    <option disabled value>Assign user or team </option>
                    {usersAndDepartments.map(user => (
                    <option key={user.name+user.email} value={`${user.name}`}>{user.name}</option>
                    ) )}
                    <option value={`${assigneeDepartment}`}>{assigneeDepartment}- Department</option>
                </select>
            </div>
                }


            <div className="flex justify-center sm:justify-between  sm:w-[80%] space-x-10 sm:space-x-5">
            <label
                className=" flex justify-start w-[20%] text-[12px]"
                htmlFor="title"
            >
                Comment
            </label>
            <textarea
                rows="7"
                className={`pl-1 border-stone-400  border border-1 w-[60%] sm:w-[80%]
                bg-white rounded-sm shadow-sm sm:text-sm
                focus:outline-none focus:ring-1
                
                }`}
                name="message"
                type="text"
                value={formData.message}
                onChange={handleOnChange}
                required
            />
            </div>
            

             {/* Submit button */}
            <div  className=' fixed right-0 left-0 bottom-10 flex items-center justify-center'>
                <button
                    className="bg-[#1d9bf0] text-white rounded-full w-24 h-6 font-bold shadow-md hover:bg-[#1a8cd8]"
                    type="submit">
                        Submit
                </button>
            </div>

        </div>
    </form>
        
    
    )
}

export default AssignTicket