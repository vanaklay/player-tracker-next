import { z } from 'zod';

export const PlayerScheme = z.object({
  firstName: z.string().trim().min(1, { message: 'Required' }),
  lastName: z.string().trim().min(1, { message: 'Required' }),
});

export const TodayPlayersScheme = z.array(
  z.object({
    lastName: z.string(),
    firstName: z.string(),
    id: z.string(),
    attendance: z.boolean(),
  })
);

export const PlayersScheme = z.array(
  z.object({
    lastName: z.string(),
    firstName: z.string(),
    id: z.string(),
    daysAttendance: z.record(z.string(), z.boolean()),
  })
);
