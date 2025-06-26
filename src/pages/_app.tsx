import type { AppProps } from 'next/app';
import Layout from "@/components/Layout";
import { FilterProvider } from "@/context/FilterContext";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FilterProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </FilterProvider>
  );
}

export default MyApp;
