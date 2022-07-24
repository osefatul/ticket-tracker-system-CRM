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
