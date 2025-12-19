FROM node:20-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack prepare pnpm@10.26.1 --activate

RUN corepack enable

WORKDIR /app

# Optimization: Fetch deps before copying code
# have our all dependencies into store and when we do
# pnpm i it put them into node_modules
COPY pnpm-lock.yaml ./  
# RUN pnpm fetch

COPY . .

# --offline cause it is available offline because of 
# pnpm-lock.yaml we already copied and 
# with pnpm fetch we put it into the store


# RUN pnpm install --offline 
RUN pnpm install


ENV DATABASE_URL='postgresql://dummy:5432/db2'
ENV DIRECT_URL="postgresql://dummy:5432/db2"
RUN pnpm run generate:db

RUN npm install -g turbo

RUN pnpm exec turbo build --filter=ws-backend...

EXPOSE 8080
# CMD ["node", "apps/ws-backend/dist/index.js"]
CMD ["pnpm","run", "start:ws"]

