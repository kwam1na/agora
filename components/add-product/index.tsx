import Head from "next/head";
import Layout from "../layout";
import { Pages } from "@/constants";
import styles from "./addProduct.module.scss";
import { Button, Title } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import BackButton from "../back-button";
import ProductTitleAndDescriptionInput from "@/features/product-title-and-description-input";
import FileInput from "@/features/file-input";
import PricingInput from "@/features/pricing-input";

const AddProduct = () => {
  return (
    <Layout component={Pages.shop}>
      <Head>
        <title>Add product</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.header}>
          <BackButton link="/shop" />
          <Title order={2}>Add product</Title>
        </div>
        <div className={styles.content}>
          <div className={styles.main}>
            <ProductTitleAndDescriptionInput />
            <FileInput />
            <PricingInput />
          </div>
          <div className={styles.side}>
            <ProductTitleAndDescriptionInput />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
