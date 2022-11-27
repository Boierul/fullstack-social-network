# Social network with JWT auth (Server)

The data is saved in a MongoDB database.
Mongoose was used for creating DB schemasas well as data validation.
RESTful implmentation of REST API. 
Postman was used to test the API endpoints.

## Backend dependencies and their role

    Node.js - runtime
    Express - backend framework
    Mongoose - MongoDB management solution
    JWT - authentication/authorization
    Multer - file upload
    Body Parser - tool to process the request body
    BCrypt - password encryption
    Cors - cross-origin requests (to the internet basically)
    Dotenv - environment variables access
    GridFS-Stream - file upload solution
    Multer-GridFS-Storage - uploader of img/obj to the local persistence
    Helmet - request safety
    Morgan - logging
    Postman - API calls builder

## Project Screenshots
![social_network_backend_1](https://i.postimg.cc/G3SzQL1Y/backend1.png)
![social_network_backend_2](https://i.postimg.cc/1XNFMZpc/backend2.png)

### In the project directory `server` (which can be accesed by typing the command: `cd server`), you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to start the server.
