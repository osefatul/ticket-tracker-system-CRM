import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersDepartment } from '../../../features/allUsersSlice/allUsersAction';
import { resetSuccessMSg } from '../../../features/newTicket/newTicketSlice';


//for Data submission
const initialFormData = {
    title: "",
    description: "",
};


function AssignTicket() {

    const [formData, setFormData] = useState(initialFormData);
    // const [formDataError, setFormDataError] = useState(initialFormDataError);

    const [assigneeDepartment, setAssigneeDepartment] = useState("");
    const [assignee, setAssignee] = useState();

    const dispatch = useDispatch();
    const {user:{name, department}} = useSelector((state)=> state.user)
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
        
        //dispatch update ticket
            // dispatch(openNewTicket({...formData, creator:name, assignee, department:assigneeDepartment, creatorDepartment: department}))
        
        
        }catch (error){
        console.log(error);
        }
        
        //clear all forms data
        setFormData(initialFormData);

    };

    //Every time formData change run this component
    useEffect(()=>{
        setTimeout(()=>{
        dispatch(resetSuccessMSg())
        },5000)
    },[resetSuccessMSg,error,isLoading,successMsg,])



    return (
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
                // onChange={handleOnChange}
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
            name="description"
            type="text"
            value={formData.description}
            onChange={handleOnChange}
            required
        />
        </div>

    </div>
    
    
    )
}

export default AssignTicket