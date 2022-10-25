import { Button, Table, Tabs, TextInput, Title } from "@mantine/core";
import {
  IconArchive,
  IconChecklist,
  IconCircles,
  IconPencil,
  IconPlus,
  IconSearch,
} from "@tabler/icons";
import React from "react";
import styles from "./productsPage.module.scss";

const enum ProductStatus {
  active,
  draft,
  archived,
  all,
}

const LOW_COUNT_THRESHOLD = 5;

const ProductsPage = () => {
  const products = [
    {
      name: "Mizani Miracle Oil",
      status: "Active",
      inventory: 1,
      category: "Face and Beauty",
      subcategory: "Hair Oils",
      vendor: "Mizani",
    },
    {
      name: "Got2b Glued",
      status: "Archived",
      inventory: 1,
      category: "Face and Beauty",
      subcategory: "Hair Gels",
      vendor: "Schwarzkopf",
    },
    {
      name: "Lace Closure Wig",
      status: "Active",
      inventory: 10,
      category: "Wigs",
      subcategory: "Closures",
      vendor: "Wigclub",
    },
    {
      name: "Fringe Unit",
      status: "Draft",
      inventory: 2,
      category: "Wigs",
      subcategory: "Closures",
      vendor: "Wigclub",
    },
    {
      name: "Wig Titi",
      status: "Active",
      inventory: 3,
      category: "Wigs",
      subcategory: "Fiber Wigs",
      vendor: "Wigclub",
    },
  ];

  const getProducts = (status: ProductStatus) => {
    switch (status) {
      case ProductStatus.all:
        return products.map((product, index) => (
          <tr key={index}>
            <td>{product.name}</td>
            <td
              className={
                product.status === "Active"
                  ? styles.active
                  : product.status === "Draft"
                  ? styles.draft
                  : styles.archived
              }
            >
              {product.status}
            </td>
            <td
              className={
                product.inventory < LOW_COUNT_THRESHOLD ? styles.lowCount : ""
              }
            >
              {product.inventory} in stock
            </td>
            <td>{product.category}</td>
            <td>{product.subcategory}</td>
            <td>{product.vendor}</td>
          </tr>
        ));

      case ProductStatus.active:
        return products
          .filter((product) => product.status === "Active")
          .map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td className={styles.active}>{product.status}</td>
              <td
                className={
                  product.inventory < LOW_COUNT_THRESHOLD ? styles.lowCount : ""
                }
              >
                {product.inventory} in stock
              </td>
              <td>{product.category}</td>
              <td>{product.subcategory}</td>
              <td>{product.vendor}</td>
            </tr>
          ));

      case ProductStatus.draft:
        return products
          .filter((product) => product.status === "Draft")
          .map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td className={styles.draft}>{product.status}</td>
              <td
                className={
                  product.inventory < LOW_COUNT_THRESHOLD ? styles.lowCount : ""
                }
              >
                {product.inventory} in stock
              </td>
              <td>{product.category}</td>
              <td>{product.subcategory}</td>
              <td>{product.vendor}</td>
            </tr>
          ));

      case ProductStatus.archived:
        return products
          .filter((product) => product.status === "Archived")
          .map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td className={styles.archived}>{product.status}</td>
              <td
                className={
                  product.inventory < LOW_COUNT_THRESHOLD ? styles.lowCount : ""
                }
              >
                {product.inventory} in stock
              </td>
              <td>{product.category}</td>
              <td>{product.subcategory}</td>
              <td>{product.vendor}</td>
            </tr>
          ));
    }
  };

  const ProductsTable = ({ children }: { children: React.ReactNode }) => {
    return (
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Status</th>
            <th>Inventory</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Vendor</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </Table>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title order={1}> Products </Title>
        <Button
          leftIcon={<IconPlus size={14} />}
          onClick={() => {
            window.location.href = "/addProduct";
          }}
        >
          Add product
        </Button>
      </div>
      <div className={styles.tabs}>
        <Tabs defaultValue="all">
          <Tabs.List>
            <Tabs.Tab value="all" icon={<IconCircles size={14} />}>
              All
            </Tabs.Tab>
            <Tabs.Tab value="active" icon={<IconChecklist size={14} />}>
              Active
            </Tabs.Tab>
            <Tabs.Tab value="drafts" icon={<IconPencil size={14} />}>
              Drafts
            </Tabs.Tab>
            <Tabs.Tab value="archive" icon={<IconArchive size={14} />}>
              Archived
            </Tabs.Tab>
          </Tabs.List>

          <div className={styles.searchBar}>
            <TextInput
              aria-label="search-bar"
              placeholder="Filter products"
              icon={<IconSearch size={14} />}
            />
          </div>
          <Tabs.Panel value="all" pt="xs">
            <ProductsTable>{getProducts(ProductStatus.all)}</ProductsTable>
          </Tabs.Panel>

          <Tabs.Panel value="active" pt="xs">
            <ProductsTable>{getProducts(ProductStatus.active)}</ProductsTable>
          </Tabs.Panel>

          <Tabs.Panel value="drafts" pt="xs">
            <ProductsTable>{getProducts(ProductStatus.draft)}</ProductsTable>
          </Tabs.Panel>
          <Tabs.Panel value="archive" pt="xs">
            <ProductsTable>{getProducts(ProductStatus.archived)}</ProductsTable>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductsPage;
