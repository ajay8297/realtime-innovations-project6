import * as gcp from "@pulumi/gcp";

// Create a Pub/Sub Topic
const topic = new gcp.pubsub.Topic("button-click-limits");

// Deploy to Cloud Run
const service = new gcp.cloudrun.Service("express-app", {
  location: "us-central1",
  template: {
    spec: {
      containers: [{
        image: "gcr.io/<YOUR_PROJECT_ID>/express-app:latest",
      }],
    },
  },
});

// Allow public access
new gcp.cloudrun.IamMember("allow-all", {
  service: service.name,
  location: service.location,
  role: "roles/run.invoker",
  member: "allUsers",
});
