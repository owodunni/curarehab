# Directus

The following directory contains the tools to build directus for use on our local server and for AWS.
We run directus on our local server, however we can use AWS or other cloud providers as a backup in case our local server goes down.

We switch between AWS and our local server by changing the CNAME record for [cms.curarehab.se](https://cms.curarehab.se) at cloudflare.

To deploy to our local server:

0. (optional) Repoint cloudflare CNAME record to our local server
1. Upload config
   ```bash
   scp .env owodunni@gluteus:/home/owodunni/.directus/.env
   ```
2. Ssh into server
   ```bash
   ssh owodunni@gluteus
   ```
3. Pull changes
   ```bash
   cd .directus && git pull
   ```
4. Restart docker
   ```bash
   ./init-letsencrypt.sh
   ```

## Deploying on Azure

In the future we will probably migrate to Azure. Instructions for doing so will be added here.

## (legacy) Deploying to AWS

We no longer host on AWS

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
    aws ecs update-service --cluster directus-cluster --service sample-app-service --force-new-deployment
   ```
