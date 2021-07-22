import { Layout } from '../components/layout/index';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  console.log('Component', Component);
  console.log('pageProps', pageProps);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
