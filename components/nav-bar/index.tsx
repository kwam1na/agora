import { useState } from "react";
import { Navbar } from "@mantine/core";
import { ButtonWithUserInfo } from "../user-avatar";
import { linksData } from "./constants";
import { useStyles } from "./useStyles";
import { Pages } from "@/constants";
import { User } from "@/types";
import Link from "next/link";

export const AppNavbar = ({
  user,
  setActiveComponent,
  component,
}: {
  user?: User;
  component?: Pages;
  setActiveComponent?: (page: Pages) => void;
}) => {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(component);

  const links = linksData.map((item) => (
    <Link href={item.href} key={item.label}>
      <a
        className={cx(classes.link, {
          [classes.linkActive]: item.label === active,
        })}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </a>
    </Link>
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
        <ButtonWithUserInfo user={user} onClick={() => alert("Hodor")} />
      </Navbar.Section>
    </Navbar>
  );
};
