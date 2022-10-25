import { Pages } from "@/constants";
import {
  AppShell,
  Header,
  Text,
  MediaQuery,
  Burger,
  Button,
} from "@mantine/core";
import HeaderButtons from "../header-buttons";
import { AppNavbar } from "../nav-bar";
import styles from "./layout.module.scss";
const Layout = ({
  children,
  component,
}: {
  children: any;
  component: Pages;
}) => {
  return (
    <AppShell
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.gray[0],
        },
      })}
      navbarOffsetBreakpoint="sm"
      navbar={<AppNavbar component={component} />}
      header={
        <Header height={70} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger opened={false} size="sm" mr="xl" />
            </MediaQuery>

            <div className={styles.headerItems}>
              <Text>Business Name</Text>
              <HeaderButtons />
            </div>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default Layout;
