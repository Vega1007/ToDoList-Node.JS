Todo List Application (Node.js + MySQL)

This is a task management (Todo List) web application built with Node.js and MySQL.

The project allows users to create accounts, log in securely, and manage their personal tasks. It was my first project using MySQL, created to practice database integration with a Node.js backend.

Features

User registration and login

Secure password encryption using bcrypt

User authentication with sessions

Create tasks

View task list

Delete tasks

Feedback messages for success and errors

Technologies Used

Node.js

Express

Express-Handlebars

Body-Parser

MySQL2

Express-Session

Connect-Flash

Bcrypt

Nodemon

Running the Project

Install the dependencies:

npm install

Configure the development script in package.json:

"scripts": {
"dev": "nodemon server.js"
}

Start the server:

npm run dev

Open your browser and access:

http://localhost:3000

Purpose of the Project

This project was created to practice backend development with Node.js, user authentication, session management, and integration with a MySQL relational database.
