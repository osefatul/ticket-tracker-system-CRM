import React, { useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewAccessJWT } from '../../api/userApi';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import NoTicketsList from '../../components/NoTicketsList';
import PageBreadCrumbs from '../../components/PageBreadCrumbs';
import TicketListsStatistics from '../../components/TicketListsStatistics';
import TicketsTable from '../../components/TicketsTable';
import { loginSuccess } from '../../features/authSlice/loginSlice';
import { fetchResolvedTickets, filterSearchTicket } from '../../features/ticketSlice/ticketAction';
import { resetTicketsList } from '../../features/ticketSlice/ticketSlice';

function ResolvedTickets() {

  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.tickets);
  const totalTickets = tickets.length;


    //fetch all tickets once when the page is loaded.
    useEffect(() => {
    dispatch(resetTicketsList());
    
    // const updateAccessJWT = async () => {
    // const result = await fetchNewAccessJWT();
    // result && dispatch(loginSuccess());
    // }
    // updateAccessJWT && 
    
    dispatch (fetchResolvedTickets())
    }, [dispatch]);


    const handleOnChange = (e) => {
    const {value} = e.target;
    dispatch(filterSearchTicket(value))
    };



    return (
      <>
      <Header />
      <div className="layout ">
  
          <PageBreadCrumbs page="Resolved Tickets List" />
  
          <div className="
                  flex flex-col md:flex-row items-center justify-center md:justify-between  space-y-2 md:space-y-0 px-0 md:px-6 ">

                <div className="text-slate-800 font-bold border-b border-amber-600 shadow-lg text-[16px] sm:text-[21px]">
                    Resolved Tickets
                </div>
      
              <div className="flex flex-col pb-2 pt-2">
              
                  <div className=" flex items-start justify-start text-black py-4">
                    <p className="">
                    Total tickets:
                    </p>
                    <span className="pl-6 text-green-600 font-bold"> {totalTickets}</span>
                    
                  </div>

                  <div className="
                      text-gray-500 flex items-center justify-center border border-1    h-6  space-x-2 cursor-pointer rounded-md">
                      <AiOutlineSearch className />
                      <input
                      type="text"
                      name="searchTicket"
                      onChange={handleOnChange}
                      placeholder="Search for ticket"
                      className="focus:outline-none flex items-center justify-center text-[13px]"
                      />
                  </div>
              </div>

          </div>

          { tickets.length > 0 ? <TicketsTable /> :
          <div>
          <NoTicketsList/>
          </div>
          }
  
      </div>
  
      <Footer />
      </>
  );
}

export default ResolvedTickets