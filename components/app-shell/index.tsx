import React, { useState } from "react";
import { AppShell, Header, Text, MediaQuery, Burger } from "@mantine/core";
import { AppNavbar } from "../nav-bar";
import Dashboard from "@/components/dashboard";
import Users from "@/components/users";
import Settings from "../settings";
import Orders from "../orders";
import Shop from "../shop";
import { Pages } from "@/constants";
import { User } from "@/types";
import { mockMetrics } from "@/utils/mock-data";

export default function AppShellDemo({ user }: { user?: User }) {
  const [opened, setOpened] = useState(false);

  const pages = {
    [Pages.dashboard]: <Dashboard user={user} />,
    [Pages.users]: <Users />,
    [Pages.settings]: <Settings />,
    [Pages.orders]: <Orders />,
    [Pages.shop]: <Shop />,
    [Pages.logout]: <></>,
  };

  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(
    pages.Dashboard
  );

  const setSelectedComponent = (component: Pages) => {
    setActiveComponent(pages[component]);
  };

  return (
    <AppShell
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.gray[0],
        },
      })}
      navbarOffsetBreakpoint="sm"
      navbar={
        <AppNavbar setActiveComponent={setSelectedComponent} user={user} />
      }
      header={
        <Header height={70} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                mr="xl"
              />
            </MediaQuery>

            <Text>Business Name</Text>
          </div>
        </Header>
      }
    >
      {activeComponent}
    </AppShell>
  );
}
