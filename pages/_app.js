import Head from 'next/link';

import { Layout } from '../components/layout/index';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  console.log('Component', Component);
  console.log('pageProps', pageProps);
  return (
    <Layout>
      <Head>
        <title>Next Events</title>
        <meta name='description' content='NEXTJS EVENTS' />
        <mata name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
