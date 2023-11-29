import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Providers from './providers';
import Layout from '@/src/components/Layout';
import Navbar from '@/src/components/Navbar';
import { Header } from '@/src/components/Layout/Header';
import { TeamConfig } from '@/src/lib/config';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <Layout title={TeamConfig.teamName}>
          <Navbar />
          <Component {...pageProps} />
        </Layout>
      </div>
    </Providers>
  );
}
