FROM node:22-alpine

WORKDIR /app

# Install dependencies first so this layer is cached between code changes.
COPY package.json package-lock.json ./
RUN npm ci

# Source is mounted from your machine by docker-compose.yml, so edits show up live.
EXPOSE 5173
CMD ["npm", "run", "dev"]
