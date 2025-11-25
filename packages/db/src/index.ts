import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg'
// import { PrismaClient } from "../dist/client.js";
import { PrismaClient } from "./generated/client.ts";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })

export const prismaClient = new PrismaClient({ adapter })



