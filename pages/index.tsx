import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import AppShellDemo from "@/components/app-shell";
import { UserContext } from "@/contexts/user-context";
import Dashboard from "@/components/dashboard";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <UserContext.Consumer>
        {({ user }) => <AppShellDemo user={user} />}
      </UserContext.Consumer> */}
      <Dashboard />
    </div>
  );
};

export default Home;
