import { Html, Head, Main, NextScript } from 'next/document';
import { Layout } from '@/src/components/Layout';
import { CONFIG } from '../src/config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Document() {
  const queryClient = new QueryClient();
  return (
    <Html lang="en">
      <Head />
      <body>
        <QueryClientProvider client={queryClient}>
          <Layout title={CONFIG.teamName}>
            <Main />
            <NextScript />
          </Layout>
        </QueryClientProvider>
      </body>
    </Html>
  );
}
