# Directus

The following directory contains the tools to build directus for use on AWS.
We use directus as our CMS and we deploy it to [cms.curarehab.se](https://cms.curarehab.se).

## Deploying to AWS

1. Authenticate
   ```bash
   aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin 281435485557.dkr.ecr.eu-north-1.amazonaws.com
   ```
2. Build
   ```bash
   docker build -t directus .
   ```
3. Tag
   ```bash
   docker tag directus:latest 281435485557.dkr.ecr.eu-north-1.amazonaws.com/directus:latest
   ```
4. Push
   ```bash
   docker push 281435485557.dkr.ecr.eu-north-1.amazonaws.com/directus:latest
   ```
5. (optional) Update .env. When running directus it uses environment variables from `directus.env` deployed in a s3 bucket. Any changes
   to the local .env file needs to be pushed to the s3 bucket.
   ```bash
   aws s3 cp .env s3://curarehab.se/directus.env
   ```
6. Deploy (not tested)
   ```bash
    aws ecs update-service --cluster curarehab-cluster --service sample-app-service --force-new-deployment
   ```
