import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { envVars } from "../config/env.ts";
import { PrismaClient } from "../../generated/prisma/client.ts";


const connectionString = envVars.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
