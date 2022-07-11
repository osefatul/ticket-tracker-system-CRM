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
