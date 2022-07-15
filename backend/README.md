# TICKET SYSTEM API

### ERROR HANDLER

We have used error handler to cope with any error inside routers(ticket or user). if any error happens in the routers that will be passed to handleError.

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

In this phase there is a token router `tokensRouter` where it will redirect us into a get request so we will be able to renew access token from the refresh token and extending the refresh token expiration data as well.
