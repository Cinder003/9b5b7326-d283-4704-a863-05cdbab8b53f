# Todo App - Frontend

This is the frontend for the full-stack Todo application, built with React, Vite, TypeScript, and Tailwind CSS.

## Features

- Add, edit, and delete todos
- Mark todos as complete
- Filter todos (All, Active, Completed)
- Clear all completed todos
- Modern, responsive, and colorful UI

## Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **API Client:** Axios
- **Animations:** Framer Motion
- **Icons:** React Icons

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd Front-end
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the `Front-end` directory and add the following variable. This should point to your backend API.
    ```
    VITE_API_BASE_URL=http://localhost:3000/api
    ```

### Available Scripts

-   **`npm run dev`**: Starts the development server with hot-reloading at `http://localhost:5173`.
-   **`npm run build`**: Compiles the TypeScript and React code for production into the `dist` folder.
-   **`npm run lint`**: Lints the codebase using ESLint.
-   **`npm run preview`**: Serves the production build locally to preview it.

## Docker

You can also run the frontend using Docker.

1.  **Build the Docker image:**
    ```bash
    docker build -t todo-frontend .
    ```

2.  **Run the Docker container:**
    ```bash
    docker run -p 5173:5173 -e VITE_API_BASE_URL=http://<your_backend_ip>:3000/api todo-frontend
    ```

For a seamless experience, use the `docker-compose.yaml` file in the root directory to run both the frontend and backend together.

```bash
docker-compose up --build
```