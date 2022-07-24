import axios from "axios"

const rootUrl = "http://localhost:5000/v1/";
const loginUrl = rootUrl + "user/login";
const userProfileUrl = rootUrl + "user";
const logoutUrl = rootUrl + "user/logout";
const newAccessJWT = rootUrl + "tokens";


export const userLogin = async (formData) =>{
    try {
    const res = await axios.post(loginUrl, formData);
    
    if(res.status === 200){
        sessionStorage.setItem("accessJWT", res.data.accessJwtToken.JwtAccess);
        localStorage.setItem("crmSite", JSON.stringify({refreshJWT:res.data.refreshJwtToken.NewRefreshToken}))
        }
    console.log(res)
    return res.data;
    
    }catch(error){
        console.log(error);
        return error
    }
}