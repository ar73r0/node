# Tentverhuur API

## Overview

The Tentverhuur API allows you to manage tents and bookings. You can perform CRUD operations on tents and bookings, as well as search tents based on different criteria. The API is powered by Node.js, Express, and Sequelize, with a MySQL database.

## Features

- **CRUD operations** for both tents and bookings.
- **Search functionality** for tents by name, capacity and price per day.
- **Pagination** with limit and offset for listing tents.
- **Sorting** for tents by capacity and price per day (ascending).
- API **documentation** accessible via the root endpoint.

## Prerequisites

- Node.js (v20 or later)
- MySQL database
- Sequelize ORM

## Installation

To get started with the Tentverhuur API, follow the steps below:

### 1. Clone the repository

Clone the repository to your local machine using Git:

```bash
git clone https://github.com/ar73r0/node
```

### 2. Install dependencies

Install the required dependencies using npm (Node.js package manager). This will install all necessary packages specified in the `package.json` file:

```bash
npm install
```

### 3. Set up the MySQL database

Create a MySQL database for the project. You can do this by logging into your MySQL instance and running:

```sql
CREATE DATABASE tenten;
```

### 4. Set up environment variables

Create a `.env` file in the project root directory to store sensitive information such as the database credentials. For example:

```env
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=tenten
PORT=3000
DIALECT=mysql
```

### 6. Start the server

You can start the server using one of the following commands:

```bash
node app.js
```

The server will run on the default port (e.g., `http://localhost:3000`).

### 7. Test the API

You can now test the API using Postman or any other API testing tool. You can access the full API documentation at the root endpoint (`/`).

