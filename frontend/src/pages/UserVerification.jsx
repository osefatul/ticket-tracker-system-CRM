import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {userRegistrationVerification } from "../api/userApi"
import Spinner from "../utils/spinner";



const initialResponse = {
    status: "",
    message: "",
};


function UserVerification() {

    const { email } = useParams();
    const dt = { email };

    const [response, setResponse] = useState(initialResponse);

    useEffect(() => {

        const apiCall = async () => {
        const result = await userRegistrationVerification(dt);
        console.log(result)
        setResponse(result);
        };
    
        //call api and send the _id to verify user
        !response.status && apiCall();

    }, [response]);



    return (
        <div className=" h-screen flex items-center justify-center">
        <div className="">
            <div className="">
                {!response.status && <Spinner />}
                {response.status === "success" ? (

                <div className="flex flex-col items-center justify-center mt-10">
                    <div className="text-black text-[20px]">
                        {response.message}
                    </div>
                    <button className="rounded bg-green-600 text-white w-[40%] h-10 cursor-pointer mt-4">
                    <Link to="/">
                        Click here to Sign in
                    </Link>
                    </button>
                </div>

                ): 
                <div className="text-black text-[20px]">
                {response.message}
                </div>
            
            }
            </div>
            
        </div>
    </div>
    
    )
}

export default UserVerification