import "../styles/globals.css";
import Layout from "../Components/Layout/layout";

import AuthProvider from "../contexts/auth";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
