

# Real-Time Innovations Project 7 - Express App with Google Cloud Run

## Overview

This project is an **Express.js** web application deployed on **Google Cloud Run**. It includes two buttons (Blue and Red), each with a rate limit of 10 clicks per minute. If the user exceeds the limit, an error message is displayed. The project also uses **Google Cloud Pub/Sub** for notifications, and **Pulumi** for infrastructure management. The app is containerized using **Docker** and deployed via **CI/CD** on **Google Cloud Run**.

## Features

- **Cloud Platform**: Built on **Google Cloud Platform (GCP)** and **Firebase** for scalable and secure deployments.
- **Authentication & Authorization**: Utilizes **IAM** roles for managing access and permissions.
- **Monitoring & Alerting**: Integrated with GCP's logging and monitoring tools for observability.
- **Node.js & TypeScript**: Developed with **Node.js**, **Express**, and **TypeScript** for type safety and robust API development.
- **API Versioning**: Implements versioning strategies for **RESTful APIs** to ensure backward compatibility.
- **CI/CD Pipelines**: Automated pipelines using Pulumi and GitHub Actions to streamline deployments.
- **Infrastructure as Code**: Utilizes **Pulumi** for resource management, including:
  - Dockerized container builds and scaling.
  - Cloud Run for serverless container orchestration.
  - Pub/Sub for messaging services.
- **Database Support**: Configured for databases like **Postgres**, **Datastore**, and **MongoDB**.

## Technology Stack

| **Category**         | **Technologies**                                                             |
|-----------------------|-----------------------------------------------------------------------------|
| Cloud Platform        | GCP (Cloud Run, Pub/Sub, Logging, Monitoring, IAM)                          |
| Backend Framework     | Node.js, Express                                                           |
| Language              | TypeScript                                                                 |
| Infrastructure as Code| Pulumi (with Docker and GCP providers)                                      |
| Containerization      | Docker,
| Databases             | Redis                                              |                                 |
| CI/CD Pipelines       | GitHub Actions, Pulumi automation                                          |

## Prerequisites

1. **Node.js** and **npm** installed on your system.
2. **Pulumi CLI** installed and configured.
3. Docker installed for building and deploying containers.
4. Access to a Google Cloud Project with permissions for Cloud Run, Pub/Sub, and IAM.
5. Firebase.

## Getting Started

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
     
     - docker build -t gcr.io/myfinal-project6-443911/express-app .

  * Push the image to Google Container Registry:  *
     
     docker push gcr.io/myfinal-project6-443911/express-app
     

2. **Pulumi Setup for Deployment**:  
   - **Install Pulumi CLI**  

   - **Login to Pulumi**:  
  
    - pulumi login
     

   - **Initialize Pulumi Project**:  
     If you have not already done so, run:  
   
     - pulumi new typescript
     

   - **Configure Pulumi Stack**:  
     Set your project and environment configuration:
     
    - pulumi config set gcp:project myfinal-project6-443911
     - pulumi config set gcp:region us-central1
    

   - **Add Required Pulumi Code**:  
     Replace the content of the `index.ts` file with the deployment script for:
     - Google Cloud Run service
     - Google Pub/Sub topic
     - IAM roles and policies for Pub/Sub integration

   - **Run Pulumi Up**:  
     Deploy your app using:
    
     pulumi up
  
     Confirm the changes in the preview and proceed.

   - **Export the Cloud Run URL**:  
     After deployment, Pulumi will output the Cloud Run service URL. Use it to access your deployed app.

3. **Set Environment Variables**:  
   Ensure the following variables are properly configured in Pulumi or your runtime environment:
   - `DATABASE_URL`: Connection string for the backend database.
   - `PORT`: Default is `8080`.
   - `PUBSUB_TOPIC`: Google Pub/Sub topic for rate limit notifications.

### 5. **Continuously deploy from a repository (source) in google cloud run**

  
   - **Secrets to add in GitHub**:
     - **`GCP_CREDENTIALS`**: Google Cloud service account key JSON (store it as a GitHub secret).

### 6. **Access Your App**

   - After deployment, **Pulumi** will output the URL of your Cloud Run app. You can access it in your browser.

   - https://realtime-innovations-project6-57338077025.us-central1.run.app/

