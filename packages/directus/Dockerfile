FROM directus/directus:10

USER root

RUN corepack enable \
  && corepack prepare pnpm@8.3.1 --activate

RUN apk --no-cache add curl && \
    curl --create-dirs -o /var/directus/root.ca 'https://cockroachlabs.cloud/clusters/e5c0b86c-457b-43cf-9c27-ff75c024eef1/cert'

COPY ./config.js /var/directus/config.js

USER node
RUN pnpm install directus-extension-wpslug-interface directus-extension-editorjs

USER root
