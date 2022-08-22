import axios from "axios"
import UserVerification from "../pages/UserVerification";

// Before hosting
const rootUrl = "http://localhost:5000/v1/";
const loginUrl = rootUrl + "user/login";
const userProfileUrl = rootUrl + "user";
const allUsersProfileUrl = rootUrl + "user/users";
const logoutUrl = rootUrl + "user/logout";
const newAccessJWT = rootUrl + "tokens/new-access-jwt";
const UserVerificationUrl = userProfileUrl + "/verify";
const UserInfoOnEditUrl = userProfileUrl + "/user_details/"
const EditUserInfoOnUrl = userProfileUrl + "/user_details/"
const deleteUserUrl = userProfileUrl + "/delete-user/";
const fetchUsersDept = userProfileUrl + "/assigned-user/"



// After Hosting
// const rootUrl = "https://ticketing-crm.herokuapp.com/v1/";
// const loginUrl = rootUrl + "user/login";
// const userProfileUrl = rootUrl + "user";
// const allUsersProfileUrl = rootUrl + "user/users";
// const logoutUrl = rootUrl + "user/logout";
// const newAccessJWT = rootUrl + "tokens/new-access-jwt";
// const UserVerificationUrl = userProfileUrl + "/verify";
// const fetchUsersDept = userProfileUrl + "/assigned-user/"
// const UserInfoOnEditUrl = userProfileUrl + "/user_details/"
// const EditUserInfoOnUrl = userProfileUrl + "/user_details/"
// const deleteUserUrl = userProfileUrl + "/delete-user/";

const DemoAdminUrl = "http://localhost:5000/v1/user/demo-admin/";
const DemoUserUrl = "http://localhost:5000/v1/user/demo-admin/"





//-----------------------------------------------------------------------------

//Register a user
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

//-----------------------------------------------------------------------------


//Verify user after registration
export const userRegistrationVerification = async (formDate)=>{
    
    try {
        const res = await axios.patch(UserVerificationUrl, formDate);
        if(res.status === 200){
            // console.log(res.data.message)
            return res.data
        }
        return res

    }catch(error){
        console.log(error);
        return error
    }
}


//-----------------------------------------------------------------------------

//Login user
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





//-----------------------------------------------------------------------------

//Demo Admin user
export const DemoAdminLogin = async () =>{
    try {
    const res = await axios.post(DemoAdminUrl,);

    
    // console.log(res)
    if(res.status === 200){
        sessionStorage.setItem("accessJWT", res.data.accessJwtToken.JwtAccess);

        localStorage.setItem("crmSite", JSON.stringify({refreshJWT:res.data.refreshJwtToken.NewRefreshToken}))
        return res.data;
        }
    
    // if there is an error we will send the whole response.
    return res.data
    
    }catch(error){
        console.log(error);
        return error
    }
}



//-----------------------------------------------------------------------------

//Demo Non-Admin user
export const DemoNonAdminLogin = async () =>{
    try {
    const res = await axios.post(DemoUserUrl,);
    
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




//-----------------------------------------------------------------------------

// update or fetch new access token
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


//-----------------------------------------------------------------------------

//Fetch single user -a logged in user data or profile
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

        console.log(res)
        return res.data
    }catch(error){
        console.log(error);
        return(error.message);
    }
}



//-----------------------------------------------------------------------------

//Fetch User information on the Edit page.
export const fetchUserInfoEdit = async (id) =>{
    try {
        const accessJWT = sessionStorage.getItem('accessJWT');

        if(!accessJWT){
            return "Token not found";
        }
        const res = await axios.get(UserInfoOnEditUrl + id, {
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

//-----------------------------------------------------------------------------




//Fetch User information on the Edit page.
export const UpdateUserInfoEdit = async (id, userInfo) =>{
    try {
        const accessJWT = sessionStorage.getItem('accessJWT');

        if(!accessJWT){
            return "Token not found";
        }
        const res = await axios.put(UserInfoOnEditUrl + id, userInfo, {
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

//-----------------------------------------------------------------------------

//Fetch All users in DB

export const fetchAllUsers = async () =>{
    try {
        const accessJWT = sessionStorage.getItem('accessJWT');

        if(!accessJWT){
            return "Token not found";
        }

        const res = await axios.get(allUsersProfileUrl, {
            headers: {
                Authorization: accessJWT
            }
        })

        // console.log(res)
        return res.data.users
    }catch(error){
        console.log(error);
        return(error.message);
    }
}
//-----------------------------------------------------------------------------



//Fetch All users with specific dept in DB
export const fetchUsersWithDepartment = async (dept) =>{
    try {
        // const res = await axios.post("http://localhost:5000/v1/user/assigned-user/", dept)
        const res = await axios.post(fetchUsersDept, dept)
        return res.data.users;
    }catch(error){
        console.log(error);
        return(error.message);
    }
}
//-----------------------------------------------------------------------------



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

//-----------------------------------------------------------------------------



//use this where the logout option is.

export const userDelete = async (id) => {
    try {
        await axios.delete(deleteUserUrl+id, {
        headers: {
            Authorization: sessionStorage.getItem("accessJWT"),
        },
    });
    } catch (error) {
        console.log(error);
        return error.message;
    }
};