# User Management API

This project is a backend application for managing user information using a PostgreSQL relational database. It is built with TypeScript and Express, and utilizes Prisma as the ORM for database interactions.

## Features

- User registration and authentication
- Input validation for user data
- Secure password management
- RESTful API for user-related operations

## Technologies Used

- TypeScript
- Express
- PostgreSQL
- Prisma
- dotenv

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- PostgreSQL database

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd user-management-api
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your database connection string:

   ```
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
   ```

4. Run the Prisma migration to set up the database:

   ```bash
   npx prisma migrate dev --name init
   ```

### Running the Application

To start the application, run:

```bash
npm run start
```

The server will start on `http://localhost:3000`.

### API Endpoints

- `POST /users` - Create a new user
- `GET /users/:id` - Retrieve user information by ID
- `GET /users` - Retrieve all users

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License.