Real-Time Innovations Project 7 - Express App with Google Cloud Run
Overview
This project is an Express.js web application deployed to Google Cloud Run. It includes two buttons (Blue and Red) with a rate-limiting feature: each button can be clicked a maximum of 10 times per minute. The project uses Google Cloud Pub/Sub for notifications and Pulumi for infrastructure management.

Tech Stack
Express.js: Web framework for Node.js.
Google Cloud Run: Serverless platform for deploying containers.
Google Cloud Pub/Sub: Messaging service for notifications.
Pulumi: Infrastructure as code tool.
Docker: For containerizing the app.
Deployment Instructions
Set up Google Cloud:

Create a Google Cloud project.
Enable Cloud Run, Pub/Sub, and IAM API.
Install Pulumi:

Install Pulumi: curl -fsSL https://get.pulumi.com | sh
Authenticate Pulumi with Google Cloud: pulumi login
Build and Push Docker Image:

Build the image: docker build -t gcr.io/<your-project-id>/express-gcp-app:latest .
Push the image: docker push gcr.io/<your-project-id>/express-gcp-app:latest
Run Pulumi to Deploy:

Install dependencies: npm install
Deploy with Pulumi: pulumi up
Pulumi will deploy the app to Cloud Run and create the necessary Google Cloud resources.

Access Your App:

After deployment, Pulumi will output the URL for your app.
Setting Up Locally
Clone the repository:

bash
Copy code
git clone https://github.com/<your-username>/express-gcp-app.git
cd express-gcp-app
Install dependencies:

Copy code
npm install
Run the app locally:

sql
Copy code
npm start
The app will be available at http://localhost:8080.

Required Environment Variables
REDIS_HOST: IP address or hostname of your Redis instance (if using Redis).
GCP_PROJECT_ID: Google Cloud Project ID.
GCP_CREDENTIALS: Path to Google Cloud service account credentials JSON file (for deployment).
How It Works
Express.js App: Provides two buttons (Blue and Red). Users can click them a maximum of 10 times per minute. If the limit is exceeded, the app shows an error.
Rate Limiting: Uses Redis (or in-memory) to track user clicks and enforce the rate limit.
Google Cloud Run: Hosts the app in a serverless container, scaling automatically based on traffic.
Google Cloud Pub/Sub: Publishes notifications when a user hits the rate limit.
Pulumi: Manages and deploys the Google Cloud resources, including Cloud Run, Pub/Sub, and IAM roles.
Public App URL
Once deployed, access your app at:

arduino
Copy code
https://<your-cloud-run-url>
