import { Link } from "react-router-dom";



export const columns = [
        {
            field: "id",
            headerName: "Ticket ID",
            width: 220,
            renderCell: (params) => {
            return (
                <Link to={`/ticket_communication/${params.row._id}`}>
                <div>{params.row._id}</div>
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
                <Link to={`/ticket_communication/${params.row.id}`}>
                <div>{params.row.title}</div>
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
                <Link to={`/ticket_communication/${params.row.id}`}>
                <div>{params.row.severity}</div>
                </Link>
            );
            },
        },

        {
            field: "department",
            headerName: "Department",
            width: 100,
            renderCell: (params) => {
            return (
                <Link to={`/ticket_communication/${params.row.id}`}>
                <div>{params.row.department}</div>
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
                <Link to={`/ticket_communication/${params.row.id}`}>
                <div 
                className= {
                    `${params.row.status === "Resolved" ? "text-green-800":"text-red-800"}`}>
                
                {params.row.status}</div>
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
                <Link to={`/ticket_communication/${params.row.id}`}>
                <div>{new Date (params.row.openAt).toLocaleString()}</div>
                </Link>
            );
            },
        },
        ];