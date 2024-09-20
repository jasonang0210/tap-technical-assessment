# We Are The Champions: Client

This portion of the repository contains the client code for the app.

Tools: React, Typescript, Redux

## Code Structure

Generally, it is split up between `pages`, `components`, `api`, and `redux`

### Pages

This is contained within the `/pages` folder.

- Every individual page is defined here.
- Acts as an entry point for the page, along with the main code logic

### Components

This is contained within the `/components` folder.

- Acts as an abstraction to the components in `/pages`, to improve readability and modularity.

### API

This is contained within the `/api` folder.

- Makes API calls and serialise the data accordingly.
- Acts as the main gateway between the client and server.

### Redux

This is contained within the `/redux` folder.

- Stores data within the Redux store.
- Handles for dispatching of error messages as well.
