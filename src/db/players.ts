import { Player } from '@prisma/client';
import { prisma } from './prisma';
import { getTodayDate } from '../utils/date';
import { TodayPlayer } from '../types/players';
import toast from 'react-hot-toast';
import { DaysAttendance } from '../types/attendances';

export const findPlayers = async () => {
  try {
    const players = await prisma.player.findMany();
    return players;
  } catch (error) {
    toast.error('Error on findPlayers');
  }
};

export const getPlayers = async () => {
  try {
    const players = await prisma.player.findMany();
    const daysAttendance = await prisma.attendance.findMany();
    const filledPlayers = players.map((player) => {
      const playerAttendances = getPlayerDaysAttendance(daysAttendance, player);
      return { ...player, daysAttendance: playerAttendances };
    });
    return filledPlayers;
  } catch {
    toast.error('Error on getPlayers');
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
    toast.error(`${error}`);
  }
};

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
    toast.error(`Error add player : ${error}`);
  }
};

export const deletePlayerOnDatabase = async (players: string[]) => {
  if (players.length === 0) throw new Error('Players is undefined !');
  try {
    const data = fetch('/api/players', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(players),
    })
      .then((res) => res.json())
      .then((data) => data);

    return !!data;
  } catch (error) {
    return false;
  }
};
