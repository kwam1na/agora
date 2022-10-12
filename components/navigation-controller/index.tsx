import { NavigationControllerItem } from "@/types";
import { Breadcrumbs, Stack, Anchor, Container, Button } from "@mantine/core";
import React from "react";
import styles from "./navigation-controller.module.scss";

interface NavigationControllerProps {
  push?: Function;
  pop?: Function;
  items?: Array<string>;
}

const NavigationController = ({
  push,
  pop,
  items,
}: NavigationControllerProps) => {
  const breadcrumbs = items?.map((item, index) => (
    <Anchor key={index}>{item}</Anchor>
  ));

  const [children, setChildren] = React.useState<Array<React.ReactNode>>([]);
  const [navItems, setNavItems] = React.useState<Array<string>>([]);

  const handlePush = (item: NavigationControllerItem) => {
    setChildren((prev) => [...prev, item.component]);
    setNavItems((prev) => [...prev, item.title]);
  };

  return (
    <div className={styles.main}>
      <Stack spacing={"xs"} justify="flex-start" style={{ width: "100%" }}>
        <Breadcrumbs>{items}</Breadcrumbs>
        <Container fluid>
          <Button
            onClick={() => {
              push?.();
            }}
          >
            {" "}
            Next{" "}
          </Button>
          <Button onClick={() => pop?.()}> Previous </Button>
        </Container>
      </Stack>
    </div>
  );
};

export default NavigationController;
