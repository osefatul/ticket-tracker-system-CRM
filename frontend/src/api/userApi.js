import axios from "axios"

const rootUrl = "http://localhost:5000/v1/";
const loginUrl = rootUrl + "user/login";
const userProfileUrl = rootUrl + "user";
const logoutUrl = rootUrl + "user/logout";
const newAccessJWT = rootUrl + "tokens";


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