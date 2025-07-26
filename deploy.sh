#!/bin/bash
# Deploy the latest code to Google Cloud Run using Cloud Build
gcloud builds submit --config cloudbuild.yaml 