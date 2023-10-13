import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Providers } from './providers';
import { Layout } from '@/src/components/Layout';
import { CONFIG } from '@/src/config';
import { Navbar } from '@/src/components/Navbar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Layout title={CONFIG.teamName}>
        <Navbar />
        <Component {...pageProps} />
      </Layout>
    </Providers>
  );
}
