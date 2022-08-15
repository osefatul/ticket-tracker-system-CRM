import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";



export const columns = [
        {
            field: "id",
            headerName: "Ticket ID",
            width: 180,
            renderCell: (params) => {
            return (
                <Link to={`/ticket_communication/${params.row._id}`}>
                <div >T- {params.row._id.slice(0,10)}...</div>
                </Link>
            );
            },
        },
        {
            field: "title",
            headerName: "Title",
            width: 200,
            renderCell: (params) => {
            return (
                <Link to={`/ticket_communication/${params.row._id}`}>
                <div >{params.row.title.slice(0,25)}...</div>
                </Link>
            );
            },
        },
        {
            field: "severity",
            headerName: "Severity",
            width: 100,
            renderCell: (params) => {
            return (
                <Link to={`/ticket_communication/${params.row._id}`}>
                <div>{params.row.severity}</div>
                </Link>
            );
            },
        },

        {
            field: "creator",
            headerName: "Assigner",
            width: 100,
            renderCell: (params) => {
            return (
                <Link to={`/ticket_communication/${params.row._id}`}>
                <div>{params.row.creator}</div>
                </Link>
            );
            },
        },

        {
            field: "assignee",
            headerName: "Assignee",
            width: 110,
            renderCell: (params) => {
            return (
                <Link to={`/ticket_communication/${params.row._id}`}>
                <div>{params.row.assignee}</div>
                </Link>
            );
            },
        },

        {
            field: "department",
            headerName: "Assignee Department",
            width: 160,
            renderCell: (params) => {
            return (
                <Link to={`/ticket_communication/${params.row._id}`}>
                <div className="text-center">{params.row.department}</div>
                </Link>
            );
            },
        },

        {
            field: "status",
            headerName: "Status",
            width: 200,
            renderCell: (params) => {
            return (
                <Link to={`/ticket_communication/${params.row._id}`}>
                <div 
                className= {
                    `${params.row.status === "Resolved" ? "text-green-800":"text-red-800"} ml-2`}>
                
                {params.row.status.slice(0,15)}...</div>
                </Link>
            );
            },
        },

        {
            field: "openAt",
            headerName: "Created Date",
            width: 200,
            renderCell: (params) => {
            return (
                <Link to={`/ticket_communication/${params.row._id}`}>
                <div>{new Date (params.row.openAt).toLocaleString()}</div>
                </Link>
            );
            },
        },


        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
            return (
                <>
                <AiOutlineDelete
                    className="text-red-700 w-[18px] h-[18px] ml-2 cursor-pointer "
                    // onClick={() => handleDelete(params.row.id)}
                />
                </>
            );
            },
        },
        
        ];

        