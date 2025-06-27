import type { AppProps } from 'next/app';
import { FilterProvider } from '@/context/FilterContext';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/context/ToastContext';
import Layout from '@/components/Layout';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <CartProvider>
        <FilterProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </FilterProvider>
      </CartProvider>
    </ToastProvider>
  );
}
