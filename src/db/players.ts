import { Player } from "@prisma/client";
import { prisma } from "./prisma";
import { getTodayDate } from "../utils/date";
import { TodayPlayer } from "../types/players";

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
      throw new Error("Error on fetching TodayPlayers");
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

export const updatePlayerAttendance = async (
  id: string,
  attendance: boolean
) => {
  try {
    console.log("player -> updatedPlayerAttendance", id, attendance);
    const player = await prisma.player.findUnique({ where: { id } });
    console.log("player", player);
  } catch (error) {
    alert(`Error updatePlayerAttendance : ${error}`);
  }
};

export const updatePlayers = async (players: TodayPlayer[]) => {
  if (players.length === 0) throw new Error("Players is undefined !");
  try {
    return await Promise.all(
      players.map(async (player) => {
        // const updatedPlayer = await updatePlayerAttendance(
        //   player.id,
        //   player.attendance
        // );
        // return updatedPlayer;

        return player;
      })
    );
  } catch (error) {
    alert(`Error Update Players : ${error}`);
  }
  return players;
};

export const addPlayerOnDatabase = async (
  firstName: string,
  lastName: string,
  daysAttendance = {}
) => {};
