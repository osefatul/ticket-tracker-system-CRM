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
    width: 180,
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
    width: 200,
    renderCell: (params) => {
    return (

        <div 
        className= {
            `${params.row.isVerified? "text-green-800":"text-red-800"}`}>
        {params.row.isVerified? "Yes":"No" }</div>
    );
    },
},
]
