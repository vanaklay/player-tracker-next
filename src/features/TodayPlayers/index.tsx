import { FormEvent, useState } from 'react';
import { formatDate, getTodayDate } from '../../utils/date';
import Submit from '../../components/Submit';
import Spinner from '../../components/Spinner';
import { TodayPlayer, UpdatedAttendancePlayer } from '../../types/players';
import PlayerItem from './PlayerItem';
import { countPlayers, getSortedPlayersByFirstName } from '@/src/utils/players';
import { updatePlayers } from '@/src/db/players';
import toast from 'react-hot-toast';

const TodayPlayers = ({ players }: { players: TodayPlayer[] }): JSX.Element => {
  const [todayPlayers, setTodayPlayers] = useState(players);
  const [playerCount, setPlayerCount] = useState(countPlayers(players));

  if (!players || players.length === 0)
    return (
      <div className="centered-spinner">
        <Spinner />
      </div>
    );

  const sortedPlayers = getSortedPlayersByFirstName(todayPlayers) as TodayPlayer[];

  const today = getTodayDate();
  const handlePlayerChange = ({ id, attendance }: UpdatedAttendancePlayer) => {
    if (!players) return;
    const updateTodayPlayers = todayPlayers.map((player) => {
      if (player.id === id) return { ...player, attendance };
      return player;
    });
    const count = countPlayers(updateTodayPlayers);
    setPlayerCount(count);
    setTodayPlayers(updateTodayPlayers);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const updatedPlayers = await updatePlayers(todayPlayers);
    console.log('updatedPlayers', updatedPlayers);
    if (updatedPlayers) {
      toast.success('Présence sauvegarder');
    } else {
      toast.error('Erreur');
    }
  };

  return (
    <div className="flex min-w-full flex-col p-4">
      <h2 className="mb-2 text-center">Liste des joueurs présents</h2>
      <h3 className="mb-2 flex justify-between">
        <span>Le {formatDate(today)}</span>
        <span>Joueurs : {playerCount}</span>
      </h3>
      <form
        className="flex w-4/5 flex-col space-y-2 self-center"
        onSubmit={handleSubmit}
      >
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
        {Boolean(playerCount) && <Submit inputValue="Valider" size="small" />}
      </form>
    </div>
  );
};

export default TodayPlayers;
