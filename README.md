# Change this later 

### To run the application test data do below step:

- create 2 .env , 1 in backend-common and 1 inside db folder and write DATABASE_URL inside it.
- do cd packages/db
- run the pnpm i -> pnpm db:migrate -> pnpm db:generate 
- the go to backend-common and run pnpm tsx test.ts to run the application OR inside packages/db and run pnpm tsx test-with-data.ts
- you might see error in the generate folder inside db/src but ignore it for now. As I didn't exactly get the cause of that error but it'll not stop you to run the code 





build.yml
name: CI

on:
  push:
    branches: ["main", "master","sanjana"]
  pull_request:
    types: [opened, synchronize]

jobs:
  build:
    name: Build and Test
    timeout-minutes: 15
    runs-on: ubuntu-latest
    env:
      DATABASE_URL: "postgresql://postgres:password@localhost:5432/mydb"
      DIRECT_URL: "postgresql://postgres:password@localhost:5432/mydb"
      TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
      TURBO_TEAM: ${{ secrets.TURBO_TEAM }}

    steps:
      - name: Check out code
        uses: actions/checkout@v4
        with:
          fetch-depth: 2

      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9.0.0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      

      - name: Install dependencies
        run: pnpm install

      - name: Generate Prisma Client
        run: pnpm --filter @repo/db2 exec prisma generate

      - name: Lint
        run: pnpm lint

      - name: Build
        run: pnpm build
        