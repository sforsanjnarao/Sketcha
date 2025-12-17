FROM node:20-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Optimization: Fetch deps before copying code
COPY pnpm-lock.yaml ./
RUN pnpm fetch

COPY . .
RUN pnpm install --offline

# Generate Client
RUN cd packages/db2 && npx prisma generate

# Build ws-backend
RUN pnpm turbo build --filter=ws-backend...

EXPOSE 8080
CMD ["node", "apps/ws-backend/dist/index.js"]