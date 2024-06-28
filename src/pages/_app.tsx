import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/globals.css';
import '../../styles/main.js';
import type { AppProps } from 'next/app';
import Head from "next/head";
import Script from 'next/script';
import { SidebarProvider } from '../../src/components/SideBar/SidebarContext'; // Asegúrate de actualizar esta ruta

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>SGAPP</title>
        <link rel="stylesheet" href="sweetalert2.min.css"></link>
      </Head>
      <script src="sweetalert2.min.js"></script>
      <Script src="//cdn.jsdelivr.net/npm/sweetalert2@11"/>
      <SidebarProvider>
        <Component {...pageProps} />
      </SidebarProvider>
    </>
  );
}
