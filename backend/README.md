# TICKET SYSTEM API

### ERROR HANDLER

We have used error handler to cope with any error inside routers(ticket or user). if any error happens in the routers that will be passed to handleError.



## USER CRUD API

We will start User's workflow from authentication and authorization.

### USER AUTHENTICATION (API & JWT)

First we used node to generate a random token for Access and refresh tokens.

```
node >
require("crypt0").randomBytes(64).toString("hex")
```
once we got random generated tokens then update env file.

#### Access Token and Refresh Token
Access Token is stored in the redis database while refresh token is stored in the mongoDB database.

The login router is a post request so we can add tokens to the databases while updating the user information as well.

### USER AUTHORIZATION
Before accessing data from the database, we need to authorize the user and verify that the user is authorized. We can do that using the access token provided by the authorization in the header.

If you remember we created a JWT access token from the email and stored it in the redis database providing `JWT token` as `key` and `userId` as `value`. So, basically in this process we get back the userId from the redis database, where we give it the `key` which was the access token and returned the userId from the redis database. 

Road map for authorization process:

1- Create a middleware and call it authorization.middleware. The job of this middleware is to wrap up the entire process of authorization. If it is successful, then pass the pointer to router for getting user profile.

2- When the router gets pointing to router.get("/", userAuthorizationMiddleware, ...) then we need to retrieve the user profile from the userId.


### MANAGE JWT IN THE BACKEND

In this phase there is a token router `tokensRouter` where it will redirect us into a GET request so we can recreate access token from the refresh token and then extending the refresh token expiration data as well.


### USER PASSWORD RESET BACKEND

we need to have to request, one POST request where it will redirect user to submit request for resetting password. Another, PATCH request where the password will be reset or get updated.

Password Road map/Workflow:

    A: Request for reset password: router.post("/reset-password")
    1- Create and send password reset pin code:
        a- models/resetPin/ResetPinModel.js
    2- Receive Email
    3- Check if user exist for the email
    4- Create unique 6 digits pin code
    5- Save pin and email in the database using: 
        a- nodemailer library
        b- models/resetPin/resetPinSchema.js
    6- Email the pin using:
        a- emailProcessing: `type` should be "request-new-password" in helpers/email.helpers.js

    B: Update password in the database: router.patch("/reset-password")
    1- Receive email, pin and new password.
    2- Validate pin
    3- Encrypt the password.
    4- Update the Password in the database.
    5- Send email notification.
    6- Delete pin from the database, so it's no longer valid.

    C: Server Side form validation.
    1- Create middleware to validate form data using:
        a- joi library
        b- helpers/formValidation.middleware.js


### USER LOGOUT
Workflow for logging out a user.
    1- Get JWT and verify
    2- Delete accessJWT from redis database
    3- delete refreshJWT from mongodb database.




### USER API Resources

All the user API router follows `v1/user/`

| #  | Routers                      | Request | Progress | Is Private | Description                             |
|----|------------------------------| --------| ---------| -----------| --------------------------------        |
| 1  | `v1/user`                    | Get     | Done     | Yes        | Get user info                           |
| 2  | `v1/user`                    | POST    | Done     | NO         | Create a user                           |
| 3  | `v1/user/login`              | POST    | Done     | NO         | Verify authentication then return JWT   |
| 4  | `v1/user/reset-password`     | POST    | Done     | NO         | Verify email & its pin to reset password|
| 5  | `v1/user/reset-password`     | PATCH   | Done     | NO         | Replace password                        |
| 5  | `v1/user/logout`             | Delete  | Done     | Yes        | Delete user accessJWT                   |


------------------------------------------------





## TICKET CRUD

#### Workflow:
    1- Create URL for endpoint.
    2- Receive new ticket data.
    3- Authorize every request with JWT.
    4- Insert in mongodb.
    5- Retrieve all the tickets for the specific user.
    6- Update conversation in the ticket database.
    7- update ticket status eg. close, pending...
    8- delete ticket from mongoDB.


### TICKET API Resources

All the user API router follows `v1/tokens/`

| #  | Routers                     | Request | Progress | Is Private | Description                     |
|----|-----------------------------| --------| ---------| -----------| --------------------------------|
| 1  | `v1/ticket`                 | Get     | Done     | YeS        | Get all tickets for login user  |
| 2  | `v1/ticket/:id`             | Get     | Done     | YeS        | Get ticket details              |
| 3  | `v1/ticket`                 | POST    | Done     | YeS        | Create new ticket               |
| 4  | `v1/ticket/:id`             | PUT     | Done     | YeS        | Update ticket details,eg: reply |
| 5  | `v1/ticket/close-ticket/:id`| PATCH   | Done     | YeS        | Update ticket status to close   |

