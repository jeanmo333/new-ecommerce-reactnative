/** @format */

import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import ListProduct from "./ListProduct";
import { getLastProuctsApi } from "../../api/Product";
import ScreenLoading from "../ScreenLoading";

export default function NewProducts() {
  const [products, setProducts] = useState(null);
  const [loadingSreen, setLoadingSreen] = useState(false);

  useEffect(() => {
    (async () => {
      setLoadingSreen(true);
      const response = await getLastProuctsApi(30);
      setLoadingSreen(false);
      setProducts(response);
    })();
  }, []);

  if (loadingSreen) return <ScreenLoading size='large' />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuevos productos</Text>
      {products && <ListProduct products={products} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center",
  },
});
