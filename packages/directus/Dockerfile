FROM directus/directus:10

USER root

RUN npm install -g corepack@latest \
  && corepack enable \
  && corepack prepare pnpm --activate

RUN apk --no-cache add curl

USER node
RUN pnpm install directus-extension-wpslug-interface directus-extension-editorjs

USER root
