import { useQuery } from '@tanstack/react-query';
import { client } from '../client/client';
import { PlayersScheme } from '../scheme/players';

const fetchPlayers = async (signal?: AbortSignal) =>
  client('api/players', { signal, zodSchema: PlayersScheme });

export const useFetchPlayersQuery = () =>
  useQuery({
    queryKey: ['players'],
    queryFn: async ({ signal }) => fetchPlayers(signal),
  });
