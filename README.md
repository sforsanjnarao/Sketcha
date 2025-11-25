# Change this later 

### To run the application test data do below step:

- create 2 .env , 1 in backend-common and 1 inside db folder and write DATABASE_URL inside it.
- do cd packages/db
- run the pnpm i -> pnpm db:migrate -> pnpm db:generate 
- the go to backend-common and run pnpm tsx test.ts to run the application OR inside packages/db and run pnpm tsx test-with-data.ts
- you might see error in the generate folder inside db/src but ignore it for now. As I didn't exactly get the cause of that error but it'll not stop you to run the code 