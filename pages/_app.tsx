import * as React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider, ColorScheme } from "@mantine/core";
import { mockUser } from "@/utils/mock-data";
import { UserContext } from "@/contexts/user-context";

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>(
    props.colorScheme
  );

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
          <Component {...pageProps} />
        </UserContext.Provider>
      </MantineProvider>
    </>
  );
}
