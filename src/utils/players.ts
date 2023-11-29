// import { updatePlayerAttendance } from "../db/players";
import { Player, TodayPlayer } from '../types/players';
import { getTodayDate } from './date';
import { Player as PrismaPlayer } from '@prisma/client';

export const getSortedPlayersByFirstName = (
  data: TodayPlayer[] | Player[] | PrismaPlayer[]
) => [...data].sort((a, b) => a.firstName.localeCompare(b.firstName));

export const getTodayPlayers = (data: Player[]) =>
  data.map((player) => {
    return {
      id: player.id,
      firstName: player.firstName,
      lastName: player.lastName,
      attendance: player.daysAttendance[getTodayDate()] || false,
    };
  });

export const countPlayers = (players: TodayPlayer[]) =>
  players.reduce((acc: number, player) => {
    return player.attendance ? acc + 1 : acc;
  }, 0);
