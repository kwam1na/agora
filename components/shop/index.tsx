import { Text } from "@mantine/core";
import NavigationController from "../navigation-controller";
import { NavigationControllerItem } from "@/types";
import React from "react";
import Users from "../users";
import Layout from "../layout";
import { Pages } from "@/constants";
import EmptyState from "@/features/empty-state";
import { IconBasket, IconUsers } from "@tabler/icons";

export default function Shop() {
  const handleAddProductClick = () => {
    alert("Hodor!");
  };
  return (
    <Layout component={Pages.shop}>
      <EmptyState
        illustration={<IconBasket size={"240px"} />}
        headerText={"Every sold-out sale begins with the first product"}
        body={"Add products to your store"}
        ctaText={"Add product"}
        onCTAClick={handleAddProductClick}
      />
    </Layout>
  );
}
