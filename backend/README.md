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

### Access Token and Refresh Token
Access Token is stored in the redis database while refresh token is stored in the mongoDB database.

The login router is a post request so we can add tokens to the databases while updating the user information as well.