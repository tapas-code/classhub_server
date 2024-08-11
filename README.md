# ClassHub Server

ClassHub Server is the backend for a classroom management system that facilitates the management of students, teachers, and classrooms. It provides a robust API with role-based access control to handle various operations within the application.

## Features

- **User Authentication**: Secure signup and login functionality using JWT.
- **Role-Based Access Control**: Different roles like Principal, Teacher, and Student have specific permissions and functionalities.
- **User Management**: Principals can create, update, and delete users.
- **Classroom Management**: Manage classrooms, assign teachers and students to classrooms.
- **Teacher and Student Management**: Manage lists of teachers and students, assign them to classrooms.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for Node.js to build APIs.
- **MongoDB**: NoSQL database for storing user and classroom data.
- **Mongoose**: ODM for MongoDB, providing a schema-based solution to model application data.
- **JWT**: For secure authentication and authorization.
- **bcryptjs**: For hashing user passwords.

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance (local or remote)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/classhub_server.git

2. Navigate to the project directory:

   ```bash
   cd classhub_server

3. Install the dependencies:

   ```bash
   npm install

4. Create a .env file in the root directory and add the following environment variables:

   ```env
   PORT=8080
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret

5. Start the server:

   ```bash
   npm start

6. The server will start on http://localhost:8080.

## API Endpoints

### Auth
- **POST /api/auth/signup** - Create a new user (Principal, Teacher, Student).
- **POST /api/auth/login** - Authenticate a user and receive a JWT.

### Users
- **GET /api/auth/teachers** - Get a list of all teachers (requires Principal role).
- **GET /api/auth/students** - Get a list of all students (requires Principal role).

### Classrooms
- **GET /api/classrooms** - Get a list of all classrooms.
- **POST /api/classrooms** - Create a new classroom (requires Principal role).
- **PATCH /api/classrooms/:id** - Update classroom details (requires Principal role).
- **DELETE /api/classrooms/:id** - Delete a classroom (requires Principal role).
