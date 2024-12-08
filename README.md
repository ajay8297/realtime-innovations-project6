

# Real-Time Innovations Project 7 - Express App with Google Cloud Run

## Overview

This project is an **Express.js** web application deployed on **Google Cloud Run**. It includes two buttons (Blue and Red), each with a rate limit of 10 clicks per minute. If the user exceeds the limit, an error message is displayed. The project also uses **Google Cloud Pub/Sub** for notifications, and **Pulumi** for infrastructure management. The app is containerized using **Docker** and deployed via **CI/CD** on **Google Cloud Run**.

## Tech Stack

- **Express.js**: Web framework for Node.js
- **Google Cloud Run**: Serverless platform for deploying containers
- **Google Cloud Pub/Sub**: Messaging service for notifications
- **Pulumi**: Infrastructure as code
- **Docker**: For containerizing the app
- **GitHub Actions**: For CI/CD pipeline

## Deployment Instructions

1. **Containerize the App**:  
   - Build a Docker image:  
     ```bash
     docker build -t gcr.io/final-project-443911/express-app .
     ```
   - Push the image to Google Container Registry:  
     ```bash
     docker push gcr.io/final-project-443911/express-app
     ```

2. **Deploy to Google Cloud Run**:  
   - Use Pulumi to deploy the application:  
     ```bash
     pulumi up
     ```

3. **Set Environment Variables**:  
   Make sure all required environment variables are set during deployment. For example:
   - `PORT`: Port for the Express app.
   - `DATABASE_URL`: Connection string for the backend database.
   - `REDIS_URL` (if Redis is used): Redis instance connection string.

### 4. **Set Up Pulumi for Deployment**


     Pulumi will deploy the app to **Google Cloud Run** and create the necessary resources (e.g., **Pub/Sub**, **IAM roles**).

### 5. **Continuously deploy from a repository (source or function) in google cloud run**

  
   - **Secrets to add in GitHub**:
     - **`GCP_CREDENTIALS`**: Google Cloud service account key JSON (store it as a GitHub secret).

### 6. **Access Your App**

   - After deployment, **Pulumi** will output the URL of your Cloud Run app. You can access it in your browser.

   - https://realtime-innovations-project6-57338077025.us-central1.run.app/

