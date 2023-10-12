import { Inter } from 'next/font/google';
import { getTodayPlayers } from '@/src/db/players';
import { TodayPlayer } from '@/src/types/players';
import TodayPlayers from '@/src/features/TodayPlayers';
import AddForm from '@/src/features/AddPlayer';

const inter = Inter({ subsets: ['latin'] });

export async function getServerSideProps() {
  const todayPlayers = await getTodayPlayers();
  return {
    props: { todayPlayers },
  };
}

export default function Home({ todayPlayers }: { todayPlayers: TodayPlayer[] }) {
  return (
    <main className={`flex min-h-screen flex-col items-center ${inter.className}`}>
      <TodayPlayers players={todayPlayers} />
      <AddForm />
    </main>
  );
}
