# Deployment Guide - Railway.app

This guide will help you host your School Teacher Dashboard on Railway.app.

## Prerequisites
- A GitHub account.
- A Railway.app account (login with GitHub).
- The project code pushed to a GitHub repository.

## Steps to Deploy

1.  **Push Code to GitHub**
    - Initialize a git repository in the project folder:
      ```bash
      git init
      git add .
      git commit -m "Initial commit"
      ```
    - Create a new repository on GitHub and push your code.

2.  **Create New Project on Railway**
    - Go to [Railway Dashboard](https://railway.app/dashboard).
    - Click **"New Project"** > **"Deploy from GitHub repo"**.
    - Select your repository.

3.  **Configure Service**
    - Railway will automatically detect the `Dockerfile` and start building.
    - Go to the **Settings** tab of your service.
    - Under **Networking**, click **"Generate Domain"** to get a public URL (e.g., `web-production-1234.up.railway.app`).

4.  **Add Database (MySQL)**
    - In your Railway project view, click **"New"** > **"Database"** > **"MySQL"**.
    - Once created, click on the MySQL service > **Variables**.
    - Copy the `DATABASE_URL`.

5.  **Connect Database to App**
    - Go back to your App service > **Variables**.
    - Add a new variable:
        - Key: `DATABASE_URL`
        - Value: (Paste the MySQL URL you copied)
    - *Note: You might need to append `?connection_limit=5` to the URL if you face connection issues.*

6.  **Redeploy**
    - Railway usually redeploys automatically when variables change. If not, click **"Redeploy"**.

## Verification
- Open the generated domain URL.
- You should see the Dashboard.
- Try uploading an Excel file. It should save to the MySQL database.

## Troubleshooting
- **Build Fails?** Check the "Build Logs". Ensure `npm install` and `npm run build` are passing.
- **Database Error?** Check "Deploy Logs". Ensure `DATABASE_URL` is correct.
