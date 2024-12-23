# PERN User Management Application

This is a full-stack application built with the PERN stack (PostgreSQL, Express, React, Node.js) that implements user management functionality.

## Prerequisites

- Node.js
- PostgreSQL
- npm or yarn

## Setup Instructions

### Database Setup

1. Install PostgreSQL if you haven't already
2. Create a new database:
   ```sql
   CREATE DATABASE pernusers;
   ```
3. Use the `database.sql` file in the server directory to create the required tables

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your PostgreSQL configuration:
   ```
   PG_USER=postgres
   PG_PASSWORD=your_password
   PG_HOST=localhost
   PG_PORT=5432
   PG_DATABASE=pernusers
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React application:
   ```bash
   npm start
   ```

## Features

- Create new users with first name, last name, email, phone, and password
- View list of all users with pagination (3 users per page)
- Navigate through users with Previous/Next buttons
- Delete users
- Responsive design
- Password hashing for security
- User-friendly pagination controls with page indicators

## Frontend Features

### User Management
- Clean, modern UI for user registration
- Responsive table display for user list
- Pagination system showing 3 users per page
- Navigation controls with Previous/Next buttons
- Current page indicator
- Disabled state for navigation buttons when at first/last page

### Styling
- Modern, clean interface
- Responsive design that works on all screen sizes
- Interactive buttons with hover effects
- Clear visual feedback for user actions
- Consistent color scheme throughout the application

## API Endpoints

- POST /api/users - Create a new user
- GET /api/users - Get all users
- GET /api/users/:id - Get a specific user
- PUT /api/users/:id - Update a user
- DELETE /api/users/:id - Delete a user
