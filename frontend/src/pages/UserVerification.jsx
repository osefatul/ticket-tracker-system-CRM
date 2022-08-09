import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {userRegistrationVerification } from "../api/userApi"
import Spinner from "../utils/spinner";



const initialResponse = {
    status: "",
    message: "",
};


function UserVerification() {

    const { tid, email } = useParams();
    const dt = { tid, email };

    const [response, setResponse] = useState(initialResponse);

    useEffect(() => {

        const apiCall = async () => {
        const result = await userRegistrationVerification(dt);
        console.log(result)
        setResponse(result);
        };
    
        !response.status && apiCall();

    }, [response]);


//call api and send the _id to verify user

    return (
        <div className=" h-screen flex items-center justify-center">
        <div className="">
            <div className="">
                {!response.status && <Spinner />}
                {response.status && (
                <div className="text-black text-[20px]">
                    {response.message}
                </div>
                )}
            </div>
            <div className="flex items-center justify-center mt-10">
                <button className="rounded bg-green-400 text-white w-[40%] cursor-pointer ">
                <Link to="/">
                    Click here to Sign in
                </Link>
                </button>
            </div>
        </div>
    </div>
    
    )
}

export default UserVerification