// import { updatePlayerAttendance } from "../db/players";
import { Player, TodayPlayer } from "../types/players";
import { getTodayDate } from "./date";

export const updatePlayers = async (players: TodayPlayer[]) => {
  // if (players.length === 0) throw new Error("Players is undefined !");
  // try {
  //   return await Promise.all(
  //     players.map(async (player) => {
  //       const updatedPlayer = await updatePlayerAttendance(
  //         player.id,
  //         player.attendance
  //       );
  //       return updatedPlayer;
  //     })
  //   );
  // } catch (error) {
  //   alert(`Error Update Players : ${error}`);
  // }
};

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
