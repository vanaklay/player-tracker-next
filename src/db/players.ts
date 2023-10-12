import { Player } from '@prisma/client';
import { prisma } from './prisma';
import { getTodayDate } from '../utils/date';
import { TodayPlayer } from '../types/players';

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

export const getTodayPlayers = async () => {
  try {
    const players = await getPlayers();
    if (!players) {
      throw new Error('Error on fetching TodayPlayers');
    }
    return players.map((player) => {
      return {
        id: player.id,
        firstName: player.firstName,
        lastName: player.lastName,
        attendance: player.daysAttendance[getTodayDate()] || false,
      };
    });
  } catch (error) {
    alert(error);
  }
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

export const updatePlayers = async (players: TodayPlayer[]) => {
  if (players.length === 0) throw new Error('Players is undefined !');
  try {
    fetch('/api/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(players),
    })
      .then((res) => res.json())
      .then((data) => data);
  } catch (error) {
    alert(`Error Update Players : ${error}`);
  }
  return players;
};

export const addPlayerOnDatabase = async (firstName: string, lastName: string) => {
  if (firstName.trim().length === 0 || lastName.trim().length === 0)
    throw new Error('Players is undefined !');
  const player = {
    firstName,
    lastName,
  };
  try {
    const data = await fetch('/api/player', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(player),
    }).then((res) => res.json());
    return data;
  } catch (error) {
    alert(`Error Update Players : ${error}`);
  }
};
