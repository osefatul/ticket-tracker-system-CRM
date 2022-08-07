import React, { useEffect, useState } from "react";
import { validationText } from "../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import {resetSuccessMSg} from "../features/newTicket/newTicketSlice"
import {openNewTicket} from "../features/newTicket/newTicketAction"

//for Data submission
const initialFormData = {
  title: "",
  severity: "",
  // openAt: "",
  description: "",
};

//for validation error messages
const initialFormDataError = {
  title: false,
  severity: false,
  // openAt: false,
  description: false,
};

function AddTicketForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [formDataError, setFormDataError] = useState(initialFormDataError);

  const dispatch = useDispatch();
  const {user:{name}} = useSelector((state)=> state.user)
  const {isLoading, error, successMsg} = useSelector(
    state => state.openTicket)


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: name ==="severity"? parseInt(value) :value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    //validation check
    setFormDataError(initialFormDataError);

    const isTitleValid = await validationText(formData.title); // if this is true then the warning should disappear
    setFormDataError({ ...initialFormData, title: !isTitleValid });
    
    dispatch(openNewTicket({...formData, creator:name}))

    setFormData(initialFormData);

  };


  //Every time formData change run this component
  useEffect(() => {
    return ()=>{
      successMsg && dispatch(resetSuccessMSg())
    }
  }, [dispatch, formData, formDataError]);


  return (
    <div className="pt-5 sm:w-[80%] mx-auto ">
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
        {formDataError.title && (
          <p className="flex items-center justify-center text-red-500 text-[9px] mt">
            Title is not compliant with the policy.
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
              focus:outline-none focus:ring-1 mt-2
              }`}
            name="severity"
            onChange={handleOnChange}
          >
            <option value={1}>Sev-1: Critical function down</option>
            <option value={2}>Sev-2: Critical function impaired</option>
            <option value={3}>Sev-3: Group productivity impaired</option>
            <option value={4}>Sev-4: Individual productivity affected</option>
            <option value={5}>Sev-5: productivity not immediately affected</option>
          </select>
        </div>
        {/* <div className="flex justify-center sm:justify-between sm:w-[80%] space-x-5">
          <label
            className=" flex justify-start w-[20%] text-[12px]"
            htmlFor="title"
          >
            Create Date
          </label>
          <input
            className={`pl-1 border-stone-400  border border-1 w-[60%] sm:w-[80%] bg-white rounded-sm shadow-sm sm:text-sm
              focus:outline-none focus:ring-1 mt-2
              `}
            name="createdDate"
            type="date"
            value={formData.createdDate}
            onChange={handleOnChange}
            required
          />
        </div> */}
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
            className=" text-[15px] w-[60%] sm:w-[80%] rounded-sm mt-3 border border-1 bg-green-900 text-white"
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
