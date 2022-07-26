# Ticket System

## Road map to build ticket system

### 1.Build Auth.js

We started from the auth page. What awesome about this page is that Signup, Signin and Forget password pages all are have been designed and incorporated in the same form.

### 2. Create Header and Footer

Header and footer are two different components and simple designed.

### 3. Dashboard Layout

Dashboard layout has been designed, there is a breadcrum, add ticket button along with tickets statuses and a table of tickets with dummy data.

### 4. Create "Add Ticket" page.
Add ticket page has few inputs and those inputs will be pushed to mongoDB once submitted.


### TicketList and TicketTable
Here in the TicketList component we first fetched all tickets using API and then use tickets as a whole table list of tickets and used SearchTicketsList to search for tickets using search inputs. the value of the search input will be sent as payload to a redux state, where they will operate a login on it, such as below:
```
state.searchTicketList = state.tickets.filter((row) => {
        if (!payload) return row;

        return row.title.toLowerCase().includes(payload.toLowerCase());
        });
```

Remember payload is nothing but a sent data to the reducer, which in this case is input value.


### React Authentication With JWT REST API & Redux Toolkit 
a- We only have one frontend page for authentication and authorization (pages/auth.jsx).
We have three states of the form:
        1- Sign up form
        2- Sign in form
        3- Reset Password form.

We fetched login and registered reducers and used useState hook to switch among form states.


b- Once we login successfully, then we will navigate to dashboard page, but before that we will dispatch userSlice.js to get user information so we can know the user is logged in.

c- In order to persist the application we always need to have user data in the session and local storage and for that we always get them in useEffect in the Auth.js. This means every time this page loads or navigated to auth page just check if accessJWT is the sessionStorage, if YES then navigate back to home page. Remember, we use useEffect here to persist the page.

d- We are using a layout called: DefaultLayout.jsx for Protected routes. In this component we are checking if user is logged in and has user info in the redux state. Also if accessJWT expired we can update it using an API called fetchNewAccessJWT, this Api will renew access Token from already saved refresh token in the localstorage. The most important part of this component is `Outlet`. You can fetch outlet from react-router-dom. and use this as a child.

e- In the APP.js we put each route in the DefaultLayout.jsx component as a child. This will make all routes PRIVATE/PROTECTED ROUTES.