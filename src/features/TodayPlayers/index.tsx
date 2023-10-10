import { FormEvent, useState } from "react";
import { formatDate, getTodayDate } from "../../utils/date";
import Submit from "../../components/Submit";
import Spinner from "../../components/Spinner";
import SuccessToast from "../../components/SuccessToast";
import {
  Player,
  TodayPlayer,
  UpdatedAttendancePlayer,
} from "../../types/players";
import PlayerItem from "./PlayerItem";
import { getSortedPlayersByFirstName } from "@/src/utils/players";

const TodayPlayers = ({ players }: { players: TodayPlayer[] }): JSX.Element => {
  const [showSuccess, setShowSuccess] = useState(false);

  if (!players || players.length === 0)
    return (
      <div className="centered-spinner">
        <Spinner />
      </div>
    );

  const sortedPlayers = getSortedPlayersByFirstName(players) as TodayPlayer[];

  const today = getTodayDate();
  const handlePlayerChange = ({ id, attendance }: UpdatedAttendancePlayer) => {
    if (!players) return;
    // const updateTodayPlayers = todayPlayers.map((player) => {
    //   if (player.id === id) return { ...player, attendance };
    //   return player;
    // });
    // setTodayPlayers(updateTodayPlayers);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // const updatedPlayers = await updatePlayers(players);
    // if (updatedPlayers) {
    //   setShowSuccess(true);
    //   setTimeout(() => {
    //     setShowSuccess(false);
    //   }, 3000);
    // }
  };

  return (
    <>
      <h2>Liste des joueurs présents</h2>
      <h3>Le {formatDate(today)}</h3>
      <form className="vertical-stack form" onSubmit={handleSubmit}>
        {sortedPlayers.map((player) => (
          <PlayerItem
            key={`${player.id}-${player.lastName}`}
            lastName={player.lastName}
            firstName={player.firstName}
            attendance={player.attendance}
            handlePlayerChange={handlePlayerChange}
            id={player.id}
          />
        ))}
        <Submit inputValue="Valider" />
      </form>
      {showSuccess && <SuccessToast message="Sauvegarder" />}
    </>
  );
};

export default TodayPlayers;
