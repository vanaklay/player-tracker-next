import { prisma } from '@/src/db/prisma';
import { getTodayDate } from '@/src/utils/date';
import { apiHandler } from '@/src/lib/api/apiHandler';
import { getPlayers } from '@/src/db/players';
import { TodayPlayersScheme } from '@/src/lib/scheme/players';

export default apiHandler({
  endpoints: {
    POST: async (req, res) => {
      const body = req.body;
      const safeData = TodayPlayersScheme.parse(body);

      const today = getTodayDate();
      for (let player of safeData) {
        const attendance = await prisma.attendance.findFirst({
          where: {
            playerId: player.id,
            date: today,
          },
        });
        if (attendance) {
          console.log('---- Update on db ----');
          await prisma.attendance.update({
            where: {
              id: attendance.id,
            },
            data: {
              isPresent: player.attendance,
            },
          });
        } else {
          console.log('---- Create on db ----');
          await prisma.attendance.create({
            data: {
              date: today,
              playerId: player.id,
              isPresent: player.attendance,
            },
          });
        }
      }
      res.status(200).json(safeData);
    },
    GET: async (req, res) => {
      const players = await getPlayers();
      res.status(200).json(players);
    },
    DELETE: async (req, res) => {
      const body = req.body;
      const playersToDeletePromises = body.map((id: string) => {
        const deleteAttendances = prisma.attendance.deleteMany({
          where: {
            playerId: id,
          },
        });

        const deletePlayer = prisma.player.delete({
          where: {
            id: id,
          },
        });

        return prisma.$transaction([deleteAttendances, deletePlayer]);
      });

      await Promise.all(playersToDeletePromises);
      res.status(200).json('ok');
    },
  },
});
