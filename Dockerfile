FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts \
    && npm cache clean --force

COPY server.mjs server.json glama.json README.md LICENSE ./
COPY schemas ./schemas

USER node

CMD ["node", "server.mjs"]
