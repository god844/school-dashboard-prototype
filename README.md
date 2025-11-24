# School Teacher Dashboard Prototype

A professional React dashboard for managing school uniform tailoring data, featuring Excel uploads, work status tracking, and a glassmorphism UI.

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18 or higher) installed.

### 1. Start the Backend Server
The server handles the database (SQLite for local) and API requests.

1.  Open a terminal and navigate to the `server` directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Initialize the database:
    ```bash
    npx prisma generate
    npx prisma db push
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:3001`.

### 2. Start the Frontend Client
The client is the React application you interact with.

1.  Open a **new** terminal window and navigate to the `client` directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open your browser and visit `http://localhost:5173`.

## 🛠 Features
- **Excel Upload**: Drag & drop `.xlsx` files.
- **Column Mapping**: Select which columns to import.
- **Data View**: Filter and search through uploaded data.
- **Work Status**: Track jobs (Pending, Started, Completed) with timers.
- **Export**: Download filtered data as Excel.

## 📦 Deployment
See [deployment_guide.md](./deployment_guide.md) for instructions on how to deploy to Railway.app.
