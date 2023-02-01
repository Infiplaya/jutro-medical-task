import { type AppType } from "next/dist/shared/lib/utils";
import { ApolloProvider } from "@apollo/client";
import client from "../../apollo-client";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
