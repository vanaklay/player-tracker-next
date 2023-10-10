import { Html, Head, Main, NextScript } from "next/document";
import { Layout } from "@/src/components/Layout";
import { CONFIG } from "../src/config";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-gray-900 text-white">
        <Layout title={CONFIG.teamName}>
          <Main />
          <NextScript />
        </Layout>
      </body>
    </Html>
  );
}
