import axios from "axios"

const rootUrl = "http://localhost:5000/v1/";
const loginUrl = rootUrl + "user/login";
const userProfileUrl = rootUrl + "user";
const logoutUrl = rootUrl + "user/logout";
const newAccessJWT = rootUrl + "tokens/new-access-jwt";


export const userLogin = async (formData) =>{
    try {
    const res = await axios.post(loginUrl, formData);
    
    // console.log(res)
    if(res.status === 200){
        sessionStorage.setItem("accessJWT", res.data.accessJwtToken.JwtAccess);

        localStorage.setItem("crmSite", JSON.stringify({refreshJWT:res.data.refreshJwtToken.NewRefreshToken}))
        return res.data;
        }
    
    // if there is an error we will send the whole response.
    return res
    
    }catch(error){
        console.log(error);
        return error
    }
}



export const userRegistration = async (formData)=>{
    try {
        const res = await axios.post(userProfileUrl, formData);
        // console.log(res);

        if(res.status === 200){
            console.log (res.data.message)
            return res.data.message
        }

        return res
    }catch(error){
        console.log(error);
        return error
    }
}


export const fetchNewAccessJWT = async () => {

    try {
        const {refreshJWT} = JSON.parse(localStorage.getItem("crmSite"));
        if(!refreshJWT){
            return ("Token not found")
        }

        const res = await axios.get(newAccessJWT, {
            headers:{
                Authorization: refreshJWT
            }
        })

        if(res.data.status === "success"){
            sessionStorage.setItem("accessJWT", res.data?.accessJWT?.JwtAccess)
        }

        return true;

        
    }catch(error){
        // if (error.message === "Request failed with status code 403") {
        //     localStorage.removeItem("crmSite");
        // }
        console.log(error.message)
        return false;
    }
}





export const fetchUser = async () =>{
    try {
        const accessJWT = sessionStorage.getItem('accessJWT');

        if(!accessJWT){
            return "Token not found";
        }
        const res = await axios.get(userProfileUrl, {
            headers: {
                Authorization: accessJWT
            }
        })

        // console.log(res)
        return res.data
    }catch(error){
        console.log(error);
        return(error.message);
    }
}




//use this where the logout option is.
export const userLogout = async () => {
    try {
        await axios.delete(logoutUrl, {
        headers: {
            Authorization: sessionStorage.getItem("accessJWT"),
        },
    });
    } catch (error) {
        console.log(error);
        return error.message;
    }
};