import { useState } from "react";
import { createStyles, Navbar } from "@mantine/core";
import {
  IconSettings,
  IconUsers,
  IconBuildingStore,
  IconDashboard,
  IconPackage,
  IconLogout,
} from "@tabler/icons";
import { ButtonWithUserInfo } from "../user-avatar";
import { mockUser } from "@/utils/mock-data";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      paddingBottom: theme.spacing.xl,
      marginTop: theme.spacing.md,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.sm}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).color,
        },
      },
    },
  };
});

const data = [
  { link: "", label: "Dashboard", icon: IconDashboard },
  { link: "", label: "Users", icon: IconUsers },
  { link: "", label: "Shop", icon: IconBuildingStore },
  { link: "", label: "Orders", icon: IconPackage },
  { link: "", label: "Settings", icon: IconSettings },
  { link: "", label: "Log out", icon: IconLogout },
];

export const AppNavbar = () => {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Dashboard");

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar
      height={"100%"}
      width={{ sm: 300 }}
      style={{ padding: "8px", height: "auto" }}
    >
      <Navbar.Section
        grow
        style={{ display: "flex", flexDirection: "column", gap: "4px" }}
      >
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <ButtonWithUserInfo user={mockUser} />
      </Navbar.Section>
    </Navbar>
  );
};
