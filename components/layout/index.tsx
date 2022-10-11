import { Pages } from "@/constants";
import { AppShell, Header, Text, MediaQuery, Burger } from "@mantine/core";
import { AppNavbar } from "../nav-bar";
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

            <Text>Business Name</Text>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default Layout;
