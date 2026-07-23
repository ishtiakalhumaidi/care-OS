import type { Prisma, PrismaClient } from "../../generated/prisma/client.js";

type TxClient = PrismaClient | Prisma.TransactionClient;

export const generateChildCode = async (tenantId: string, tx: TxClient) => {
  const now = new Date();
  const yearMonth = `${String(now.getFullYear()).slice(-2)}${String(now.getMonth() + 1).padStart(2, "0")}`;

  const sequence = await tx.childCodeSequence.upsert({
    where: { tenantId_yearMonth: { tenantId, yearMonth } },
    update: { lastSerial: { increment: 1 } },
    create: { tenantId, yearMonth, lastSerial: 1 },
  });

  return `${yearMonth}${String(sequence.lastSerial).padStart(6, "0")}`;
};