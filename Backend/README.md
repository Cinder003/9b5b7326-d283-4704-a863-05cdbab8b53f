# Todo App - Backend

This is the backend for the full-stack Todo application, built with Node.js, Express, TypeScript, and Prisma.

## Features

- RESTful API for Todo management
- CRUD operations: Create, Read, Update, Delete
- Additional endpoints for clearing completed todos
- Input validation with Zod
- Secure by default with Helmet, CORS, and rate limiting

## Tech Stack

- **Framework:** Express.js
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** SQLite
- **Validation:** Zod
- **Logging:** Pino

## API Endpoints

-   `GET /api/todos`: Retrieve all todos.
-   `POST /api/todos`: Create a new todo.
    -   Body: `{ "title": "string" }`
-   `GET /api/todos/:id`: Retrieve a single todo by its ID.
-   `PUT /api/todos/:id`: Update a todo.
    -   Body: `{ "title": "string", "completed": "boolean" }` (both optional)
-   `DELETE /api/todos/:id`: Delete a todo.
-   `POST /api/todos/clear-completed`: Delete all todos that are marked as complete.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd Backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the `Backend` directory and add the following variables:
    ```
    # Server Configuration
    PORT=3000
    NODE_ENV=development
    CORS_ORIGIN=http://localhost:5173

    # Database
    DATABASE_URL="file:./data/dev.db"
    ```

4.  **Set up the database:**
    Run the Prisma migration to create the database schema and the SQLite file.
    ```bash
    npx prisma migrate dev --name init
    ```
    This will create a `dev.db` file inside the `data` directory.

### Available Scripts

-   **`npm run dev`**: Starts the development server with hot-reloading using `ts-node-dev`. The server will be available at `http://localhost:3000`.
-   **`npm run build`**: Compiles the TypeScript code into JavaScript in the `dist` folder.
-   **`npm start`**: Runs the compiled JavaScript code from the `dist` folder. Use this for production.
-   **`npm run lint`**: Lints the codebase using ESLint.

## Docker

You can also run the backend using Docker.

1.  **Build the Docker image:**
    ```bash
    docker build -t todo-backend .
    ```

2.  **Run the Docker container:**
    ```bash
    docker run -p 3000:3000 -v $(pwd)/data:/usr/src/app/data todo-backend
    ```

For a seamless experience, use the `docker-compose.yaml` file in the root directory to run both the frontend and backend together.

```bash
docker-compose up --build
```