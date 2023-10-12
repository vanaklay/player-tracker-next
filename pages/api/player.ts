import { apiHandler } from '@/src/lib/api/apiHandler';
import { prisma } from '@/src/db/prisma';
import { z } from 'zod';

const BodyScheme = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

export default apiHandler({
  endpoints: {
    POST: async (req, res) => {
      const body = BodyScheme.parse(req.body);

      const player = await prisma.player.create({
        data: { ...body },
      });

      res.status(200).json({ player });
    },
  },
});
