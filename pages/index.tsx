import { getTodayPlayers } from '@/src/db/players';
import { TodayPlayer } from '@/src/types/players';
import TodayPlayers from '@/src/features/TodayPlayers';
import AddForm from '@/src/features/AddPlayer';
import { Providers } from './providers';

export async function getServerSideProps() {
  const todayPlayers = await getTodayPlayers();
  return {
    props: { todayPlayers },
  };
}

export default function Home({ todayPlayers }: { todayPlayers: TodayPlayer[] }) {
  return (
    <Providers>
      <main className={`mb-8 flex min-h-screen flex-col items-center`}>
        <TodayPlayers players={todayPlayers} />
        <AddForm />
      </main>
    </Providers>
  );
}
