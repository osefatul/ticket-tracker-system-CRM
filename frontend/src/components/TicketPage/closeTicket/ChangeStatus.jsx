import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setModalCloseSuccess } from '../../../features/modalSlice/CloseTicketModalSlice';
import { resetSuccessMSg } from '../../../features/newTicket/newTicketSlice';
import { SendTicketStatusUpdate, } from '../../../features/ticketSlice/ticketAction';

//for Data submission
const initialFormData = {
  message: "",
};

const pendingReason = ["Awaiting customer response", "Schedule", "Pending Approval", "Awaiting staff", "Awaiting Delivery", "Awaiting Confirmation",]




function ChangeStatus() {

  const {tid} = useParams()
  console.log(tid)

  const [formData, setFormData] = useState(initialFormData);
  

  const [status, setStatus] = useState("");


  const dispatch = useDispatch();
  const {user:{name}} = useSelector((state)=> state.user)
  const {isLoading, error, successMsg} = useSelector(state => state.openTicket);



  // update and dispatch department.
  useEffect(()=>{

  },[status])



  const handleOnChange = (e) => {
      const { name, value } = e.target;
      
      setFormData({
        ...formData,
        [name]: name ==="severity"? parseInt(value) :value,
      });

      //we are trying to find if status === pending.
      if(name === "status"){
        setStatus(value);

      }

      

      console.log(formData)
  };



  const handleOnSubmit = async (e) => {
      e.preventDefault();

      try {
      //Clear the every dispatch before creating a new ticket
      dispatch(resetSuccessMSg())

      console.log(formData)
      
      //dispatch update ticket
        dispatch(SendTicketStatusUpdate(tid, {...formData, sender:name, }))

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
  },[resetSuccessMSg,error,isLoading,successMsg])




  return (
    <form
    action=""
    onSubmit={handleOnSubmit}
  >
    <div className="space-y-2 sm:w-[80%] mx-auto">

        <div className="flex justify-center sm:justify-between sm:w-[80%] space-x-10 sm:space-x-5">
                <label
                    className=" flex justify-start w-[20%] text-[12px]"
                    htmlFor="title"
                >
                    Status
                </label>

                <select
                    className={`pl-1 border-stone-400  border border-1 w-[60%] sm:w-[80%]
                    bg-white rounded-sm shadow-sm sm:text-sm
                    focus:outline-none focus:ring-1
                    }`}
                    name="status"
                    onChange={handleOnChange}
                    defaultValue
                    >
                    <option disabled value>Select a status </option>
                    <option value="Assigned">Assigned</option>
                    <option value="Researching">Researching</option>
                    <option value="Work in Progress">Work in Progress</option>
                    <option value="Pending">Pending</option>
                    <option value="Resolved">Resolved</option>

                </select>
        </div>


        {status === "Pending" &&
        <div className="flex justify-center sm:justify-between  sm:w-[80%] space-x-10 sm:space-x-5">
            <label
                className=" flex justify-start w-[20%] text-[12px]"
                htmlFor="title"
            >
                Reason
            </label>

            <select
                className={`pl-1 border-stone-400  border border-1 w-[60%] sm:w-[80%]
                bg-white rounded-sm shadow-sm sm:text-sm
                focus:outline-none focus:ring-1
                }`}
                name="statusDetails"
                onChange={handleOnChange}
                defaultValue
            >
                <option disabled value>Choose pending reason </option>
                {pendingReason.map((reason, index) => (
                <option key={index + reason} value={`${reason}`}>{reason}</option>
                ) )}
            </select>
        </div>
            }


        <div className="flex justify-center sm:justify-between  sm:w-[80%] space-x-10 sm:space-x-5">
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
                    className="bg-green-700 text-slate-200 rounded-md w-24 h-6 shadow-md hover:bg-green-800"
                    type="submit">
                        Submit
                </button>
            </div>

    </div>
  
  </form>
  )
}

export default ChangeStatus