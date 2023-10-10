// import { updatePlayerAttendance } from "../db/players";
import { Player, TodayPlayer } from "../types/players";
import { getTodayDate } from "./date";

export const getSortedPlayersByFirstName = (data: TodayPlayer[] | Player[]) =>
  [...data].sort((a, b) => a.firstName.localeCompare(b.firstName));

export const getTodayPlayers = (data: Player[]) =>
  data.map((player) => {
    return {
      id: player.id,
      firstName: player.firstName,
      lastName: player.lastName,
      attendance: player.daysAttendance[getTodayDate()] || false,
    };
  });
