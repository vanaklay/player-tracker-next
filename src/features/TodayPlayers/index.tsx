import { FormEvent, useEffect, useState } from "react";
import { formatDate, getTodayDate } from "../../utils/date";
import Submit from "../../components/Submit";
import Spinner from "../../components/Spinner";
import {
  getSortedPlayersByFirstName,
  getTodayPlayers,
  updatePlayers,
} from "../../utils/players";
import SuccessToast from "../../components/SuccessToast";
import { TodayPlayer, UpdatedAttendancePlayer } from "../../types/players";
import { getPlayers } from "../../db/players";
import { Player } from "@prisma/client";
import PlayerItem from "./PlayerItem";

const TodayPlayers = ({ players }: { players: Player[] }): JSX.Element => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [todayPlayers, setTodayPlayers] = useState<TodayPlayer[]>([]);

  useEffect(() => {
    const getPlayersMap = async () => {
      try {
        const playersData = await getPlayers();
        if (!playersData) return;
        const todayPlayers = getTodayPlayers(playersData);
        const sortedData = getSortedPlayersByFirstName(todayPlayers);
        setTodayPlayers(sortedData as TodayPlayer[]);
      } catch (error) {
        alert(`Fetch players error with ${error}`);
      }
    };

    return () => {
      getPlayersMap();
    };
  }, []);

  if (!todayPlayers || todayPlayers.length === 0)
    return (
      <div className="centered-spinner">
        <Spinner />
      </div>
    );

  const today = getTodayDate();
  const handlePlayerChange = ({ id, attendance }: UpdatedAttendancePlayer) => {
    if (!todayPlayers) return;
    const updateTodayPlayers = todayPlayers.map((player) => {
      if (player.id === id) return { ...player, attendance };
      return player;
    });
    setTodayPlayers(updateTodayPlayers);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const updatedPlayers = await updatePlayers(todayPlayers);
    if (updatedPlayers) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  return (
    <>
      <h2>Liste des joueurs présents</h2>
      <h3>Le {formatDate(today)}</h3>
      <form className="vertical-stack form" onSubmit={handleSubmit}>
        {todayPlayers.map((player) => (
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
