// import { Player } from "../types/players";
import { Player } from "@prisma/client";
import { prisma } from "./prisma";

export const getPlayers = async () => {
  try {
    const players = await prisma.player.findMany();
    const daysAttendance = await prisma.attendance.findMany();
    const filledPlayers = players.map((player) => {
      const playerAttendances = getPlayerDaysAttendance(daysAttendance, player);
      return { ...player, daysAttendance: playerAttendances };
    });
    return filledPlayers;
  } catch (error) {
    alert(error);
  }
};

export const getTodayPLayers = async () => {
  const players = await getPlayers();
  return;
};

type DaysAttendance = {
  id: number;
  date: string;
  isPresent: boolean;
  playerId: string;
}[];
export const getPlayerDaysAttendance = (
  daysAttendance: DaysAttendance,
  player: Player
): Record<string, boolean> =>
  daysAttendance.reduce((acc, day) => {
    if (day.playerId === player.id) {
      return { ...acc, [day.date]: day.isPresent };
    }
    return acc;
  }, {});

export const updatePlayerAttendance = async (
  id: string,
  attendance: boolean
) => {};

export const addPlayerOnDatabase = async (
  firstName: string,
  lastName: string,
  daysAttendance = {}
) => {};
