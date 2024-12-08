import * as gcp from "@pulumi/gcp";

const topic = new gcp.pubsub.Topic("button-click-limits");

const service = new gcp.cloudrun.Service("express-app", {
  location: "us-central1",
  template: {
    spec: {
      containers: [{
        image: "gcr.io/final-project-443911/express-app:latest",
      }],
    },
  },
});

new gcp.cloudrun.IamMember("allow-all", {
  service: service.name,
  location: service.location,
  role: "roles/run.invoker",
  member: "allUsers",
});
