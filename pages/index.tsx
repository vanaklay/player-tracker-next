import { getTodayPlayers } from '@/src/db/players';
import { TodayPlayer } from '@/src/types/players';
import TodayPlayers from '@/src/features/TodayPlayers';
import { Providers } from './providers';

export async function getServerSideProps() {
  const todayPlayers = await getTodayPlayers();
  return {
    props: { todayPlayers },
  };
}

export default function Home({ todayPlayers }: { todayPlayers: TodayPlayer[] }) {
  return (
    <main className={`mb-8 flex min-h-screen flex-col items-center`}>
      <TodayPlayers players={todayPlayers} />
    </main>
  );
}
