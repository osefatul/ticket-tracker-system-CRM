import React, { useEffect, useState } from "react";
import { validationText } from "../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import {resetSuccessMSg} from "../features/newTicket/newTicketSlice"
import {openNewTicket} from "../features/newTicket/newTicketAction"
import Spinner from "../utils/spinner";
import { resetResponseMsg } from "../features/ticketSlice/ticketSlice";
import { fetchUsersDepartment } from "../features/allUsersSlice/allUsersAction";
import { fetchUsersWithDepartment } from "../api/userApi";


//for Data submission
const initialFormData = {
  title: "",
  description: "",
};

//for validation error messages
const initialFormDataError = {
  title: false,
  severity: false,
  description: false,
};



function AddTicketForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [formDataError, setFormDataError] = useState(initialFormDataError);


  const [department, setDepartment] = useState("");
  const [assignee, setAssignee] = useState();


  const dispatch = useDispatch();
  const {user:{name}} = useSelector((state)=> state.user)
  const {isLoading, error, successMsg} = useSelector(state => state.openTicket)
  const {usersAndDepartments} = useSelector(state => state.allUsers)


//update and dispatch department.
  useEffect(()=>{
    dispatch(fetchUsersDepartment({department: department}))
  },[department])




  const handleOnChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: name ==="severity"? parseInt(value) :value,
    });


    if(name === "department"){
      setDepartment(value);
    }

    if(name === "assignee") {
      setAssignee(value);
    }

    if (name === "title"){
      const title = value.length > 4
      setFormDataError({...formDataError, title} )
    }
  };


  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      //Clear the every dispatch before creating a new ticket
      dispatch(resetSuccessMSg())
      
      //dispatch new ticket
      if(formDataError.title){
        dispatch(openNewTicket({...formData, creator:name, assignee, department}))
      }
      
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
  },[resetSuccessMSg,error,isLoading,successMsg,formDataError])


  return (
    <div className="pt-5 sm:w-[80%] mx-auto ">
      
      {error && <div className=" bg-red-800 text-white text-small rounded flex items-center justify-center m-3">{error}</div>}
      {successMsg && <div className=" bg-green-800 text-white text-small rounded flex items-center justify-center m-3">{successMsg}</div>}
      {isLoading && ( <div className="flex items-center justify-center"> < Spinner /> </div> )}

      <form
        action=""
        className="text-black space-y-2 flex flex-col sm:items-center justify-center sm:justify-center boxShadow p-2 pb-5 rounded-lg "
        onSubmit={handleOnSubmit}
      >
        <div className="flex items-center justify-center text-[20px]">
          <h1>Create a Ticket</h1>
        </div>
        
        <div className="flex justify-center sm:justify-between sm:w-[80%] space-x-5">
          <label
            className="flex justify-start w-[20%] text-[12px]"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className={`pl-1 border-stone-400  border border-1 w-[60%] sm:w-[80%]
            bg-white rounded-sm shadow-sm sm:text-sm
              focus:outline-none focus:ring-1
              }`}
            name="title"
            type="text"
            value={formData.title}
            onChange={handleOnChange}
            required
          />
        </div>

        {!formDataError.title && (
          <p className="flex items-center justify-center text-red-500 text-[9px]">
            Title is not compliant with the policy - At least 5 characters.
          </p>
        )}
        
        <div className="flex justify-center sm:justify-between  sm:w-[80%] space-x-5">
          <label
            className=" flex justify-start w-[20%] text-[12px]"
            htmlFor="title"
          >
            Severity
          </label>

          <select
            className={`pl-1 border-stone-400  border border-1 w-[60%] sm:w-[80%]
            bg-white rounded-sm shadow-sm sm:text-sm
              focus:outline-none focus:ring-1
              }`}
            name="severity"
            onChange={handleOnChange}
            defaultValue
          >
            <option disabled value>Select Sev</option>
            <option value="1">Sev-1: Critical function down</option>
            <option value="2">Sev-2: Critical function impaired</option>
            <option value="3">Sev-3: Group productivity impaired</option>
            <option value="4">Sev-4: Individual productivity affected</option>
            <option value="5">Sev-5: productivity not immediately affected</option>
          </select>
        </div>

        <div className="flex justify-center sm:justify-between  sm:w-[80%] space-x-5">
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
        

        <div className="flex justify-center sm:justify-between  sm:w-[80%] space-x-5">
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
            <option disabled value>Assign a person </option>
            {usersAndDepartments.map(user => (
            <option key={user.name+user.email} value={`${user.name}`}>{user.name}</option>
            ) )}
          </select>
        </div>
    
        }
        
        
        
        <div className="flex justify-center sm:justify-between  sm:w-[80%] space-x-5">
          <label
            className=" flex justify-start w-[20%] text-[12px]"
            htmlFor="title"
          >
            Description
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
        <div className="flex justify-center sm:justify-between  sm:w-[80%] space-x-5">
          <div className="flex justify-start w-[20%]"></div>
          <button
            
            className={`text-[15px] w-[60%] sm:w-[80%] rounded-sm mt-3 border border-1 bg-green-900 text-white `}
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTicketForm;
