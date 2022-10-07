import { useState } from "react";
import { Navbar } from "@mantine/core";
import { ButtonWithUserInfo } from "../user-avatar";
import { linksData } from "./constants";
import { mockUser } from "@/utils/mock-data";
import { useStyles } from "./useStyles";
import { Pages } from "@/constants";

export const AppNavbar = ({
  setActiveComponent,
}: {
  setActiveComponent: (page: Pages) => void;
}) => {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Dashboard");

  const links = linksData.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        setActiveComponent(item.label);
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
        <ButtonWithUserInfo user={mockUser} onClick={() => alert("Hodor")} />
      </Navbar.Section>
    </Navbar>
  );
};
