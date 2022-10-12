import * as React from "react";
import Router from "next/router";
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider, ColorScheme, Loader } from "@mantine/core";
import { mockUser } from "@/utils/mock-data";
import { UserContext } from "@/contexts/user-context";

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>(
    props.colorScheme
  );
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    Router.events.on("routeChangeStart", (url) => {
      setIsLoading(true);
    });

    Router.events.on("routeChangeComplete", (url) => {
      setIsLoading(false);
    });

    Router.events.on("routeChangeError", (url) => {
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <UserContext.Provider value={{ user: mockUser }}>
          <div
            style={{
              position: "absolute",
              zIndex: 1000,
              top: "50%",
              left: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isLoading && <Loader />}
          </div>
          <Component {...pageProps} />
        </UserContext.Provider>
      </MantineProvider>
    </>
  );
}
