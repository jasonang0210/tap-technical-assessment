# We Are The Champions: Server

This portion of the repository contains the server code for the app.

Tools: Flask, SQLAlchemy

## Code Structure

I've opted to use the web-service-database layer architecture, in order to separate each step of the user request.

### Web Layer

This is contained within the main `app.py` file.

- Listens for user requests
- Parses and validates the user input
- Calls the appropriate service(s) to fulfil user request
- Returns the appropriate response to the user

### Service Layer

This is contained within the `/service` folder.

- Handles the custom logic required to complete each service request, by leveraging the database methods implemented in the database layer.
- Responsible for parsing and formatting the response data as well.
- Further validation for user input, this time with reference to the database

### Database Layer

This is contained within the `/database` folder.

- Retrieves records from the database
- Abstracted via Generic types to ensure type consistency

### Models

Ensuring type correctness is important for consistency, hence Pydantic models are used to ensure that objects handled in the server are of the appropriate structure.

They are separated into:

1. RouteModel: dictates the structure of input data from user.
2. WebModel: dictates the structure of response data to user.
3. DatabaseModel: utilised by SQLAlchemy to enable ORM queries.
