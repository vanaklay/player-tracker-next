// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/src/db/prisma";
import { z } from "zod";
import { getTodayDate } from "@/src/utils/date";

type Data = {
  name: string;
};

const TodayPlayersScheme = z.array(
  z.object({
    lastName: z.string(),
    firstName: z.string(),
    id: z.string(),
    attendance: z.boolean(),
  })
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const body = req.body;
    const safeData = TodayPlayersScheme.parse(body);

    for (let player of safeData) {
      const attendance = {
        date: getTodayDate(),
        isPresent: player.attendance,
        playerId: player.id,
      };
      await prisma.attendance.create({ data: attendance });
    }
    res.status(200).json({ name: "John Doe" });
  }
}
