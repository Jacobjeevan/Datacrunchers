# Objective

Create a usable public facing website for Data Crunchers. Enable authentication for officers. Permissions must also be implemented so functionality is available only for organization officers.

##### Features

Refer to wireframe diagrams for visual aid.

Navigation bar will include the following:

- About (Home page)
- Projects
- Events
- Library
  - Resources
  - Career Prep
- Login
- Register

As in the diagram, some of these pages will have add/edit functionality for authorized users. Authentication is implemented
through auth0 (tokens are used to validate the user, which will grant access to protected routes for Create, Update and Delete functionality)

This project will use MERN (MongoDB, Express, React and Node.js) stack for its implementation. To maintain a local state, React-query will be used, rather than a global state management system.
Auth0 wraps around App component, so no global state is required for maintaining user information.

In the backend, many of the pages will have their own API (ex: About has officers API, projects has its own). Visitors will only have access to GET route, while others routes are protected using JWT tokens. Auth0 enables users to login on the frontend, from which a token can be grabbed, which can then be passed to backend through react-query.
