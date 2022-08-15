import { AiOutlineDelete } from "react-icons/ai";

export const columns = [

    {
    field: "_id",
    headerName: "ID",
    width: 160,
    renderCell: (params) => {
    return (
        <div>User-{params.row._id.slice(0,7)}</div>
    );
    },
},
{
    field: "name",
    headerName: "Name",
    width: 90,
    renderCell: (params) => {
    return (
        // <Link to={`/ticket_communication/${params.row.id}`}>
        <div>{params.row.name}</div>
        // </Link>
    );
    },
},

{
    field: "email",
    headerName: "Email",
    width: 200,
    renderCell: (params) => {
    return (
        // <Link to={`/ticket_communication/${params.row.id}`}>
        <div>{params.row.email}</div>
        // </Link>
    );
    },
},

{
    field: "department",
    headerName: "Department",
    width: 120,
    renderCell: (params) => {
    return (
        // <Link to={`/ticket_communication/${params.row.id}`}>
        <div>{params.row.department}</div>
        // </Link>
    );
    },
},
{
    field: "company",
    headerName: "Company",
    width: 100,
    renderCell: (params) => {
    return (
        // <Link to={`/ticket_communication/${params.row.id}`}>
        <div>{params.row.company}</div>
        // </Link>
    );
    },
},

{
    field: "isVerified",
    headerName: "Verified",
    width: 100,
    renderCell: (params) => {
    return (

        <div 
        className= {
            `${params.row.isVerified? "text-green-800":"text-red-800"}`}>
        {params.row.isVerified? "Yes":"No" }</div>
    );
    },
},
{
    field: "isAdmin",
    headerName: "Admin",
    width: 100,
    renderCell: (params) => {
    return (

        <div 
        className= {
            `${params.row.isAdmin? "text-green-800":"text-red-800"}`}>
        {params.row.isAdmin? "Yes":"No" }</div>
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
        {/* <Link to={"/user/" + params.row.id}> */}
        <button className="bg-green-700 w-[40px] rounded-sm text-slate-200 text-sm">Edit</button>
        {/* </Link> */}
        <AiOutlineDelete
        className="text-red-700 w-[20px] h-[20px] ml-2 cursor-pointer "
        // onClick={() => handleDelete(params.row.id)}
        />
    </>
    );
},
},

]
