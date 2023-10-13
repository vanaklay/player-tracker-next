import { Player } from '@/src/types/players';
import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';
import { Player as PlayerDb } from '@prisma/client';

export const getFile = async () => {
  try {
    const databaseFile = path.join(process.cwd(), process.env.DATABASE_SEED ?? '');
    const json = await fs.readFile(databaseFile, 'utf-8');
    return JSON.parse(json);
  } catch (error) {}
};

const prisma = new PrismaClient();

const main = async () => {
  const data = await getFile();
  const playersPromises = data.map((player: Player) => {
    return prisma.player.create({
      data: {
        firstName: player.firstName.trim(),
        lastName: player.lastName.trim(),
      },
    });
  });

  const players = await Promise.all(playersPromises);
  const attendanceRecords = data.flatMap((player: Player) => {
    const daysAttendances = Object.keys(player.daysAttendance);
    const firstName = player.firstName.trim();
    const lastName = player.lastName.trim();
    const playerOnDb = players.find(
      (player: PlayerDb) =>
        player.firstName === firstName && player.lastName === lastName
    );
    if (!playerOnDb) return;
    const playersAttendancesPromises = daysAttendances.map((date) => {
      return prisma.attendance.create({
        data: {
          date: date,
          isPresent: player.daysAttendance[date],
          playerId: playerOnDb.id,
        },
      });
    });
    return playersAttendancesPromises;
  });
  await Promise.all(attendanceRecords);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
