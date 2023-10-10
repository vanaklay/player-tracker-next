import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const playersPromises = [];
  for (let i = 0; i < 10; i++) {
    const player = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    };
    playersPromises.push(
      prisma.player.create({
        data: player,
      })
    );
  }

  const players = await Promise.all(playersPromises);

  const attendanceRecords = [];
  for (let i = 10; i < 20; i++) {
    const today = `2023-09-${i}`;
    for (const player of players) {
      const attendance = {
        date: today,
        isPresent: Math.random() < 0.5,
        playerId: player.id,
      };
      attendanceRecords.push(
        prisma.attendance.create({
          data: attendance,
        })
      );
    }
  }

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
