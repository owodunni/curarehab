FROM directus/directus:10

USER root

RUN corepack enable \
  && corepack prepare pnpm@8.3.1 --activate

RUN apk --no-cache add curl

USER node
RUN pnpm install directus-extension-wpslug-interface directus-extension-editorjs

USER root
