import { Html, Head, Main, NextScript } from 'next/document';
import { Layout } from '@/src/components/Layout';
import { CONFIG } from '../src/config';
import { Providers } from './providers';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Providers>
          <Layout title={CONFIG.teamName}>
            <Main />
            <NextScript />
          </Layout>
        </Providers>
      </body>
    </Html>
  );
}
