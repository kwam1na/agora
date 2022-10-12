import { Text } from "@mantine/core";
import React from "react";
import Layout from "../layout";
import { Pages } from "@/constants";
import EmptyState from "@/features/empty-state";
import { IconBasket } from "@tabler/icons";
import Head from "next/head";

export default function Shop() {
  const handleAddProductClick = () => {
    alert("Hodor!");
  };
  return (
    <Layout component={Pages.shop}>
      <Head>
        <title>{Pages.shop}</title>
      </Head>
      <EmptyState
        illustration={<IconBasket size={"240px"} color={"gray"} />}
        headerText={"Every sold-out sale begins with the first product"}
        body={"Let's begin by adding a product"}
        ctaText={"Add product"}
        onCTAClick={handleAddProductClick}
      />
    </Layout>
  );
}
