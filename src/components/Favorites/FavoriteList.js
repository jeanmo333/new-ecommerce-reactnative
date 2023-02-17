/** @format */

import React from "react";
import { StyleSheet, ScrollView, View, Text, Image } from "react-native";
import { map } from "lodash";
import Product from "./Product";
import { Divider } from "react-native-paper";

export default function FavoriteList(props) {
  const { products, auth, setReloadFavorite } = props;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lista de favoritos</Text>
      <Divider style={styles.divider} />
      {map(products, (item) => (
        <Product
          key={item._id}
          item={item}
          auth={auth}
          setReloadFavorite={setReloadFavorite}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 5,
    textAlign: "center",
  },
  divider: {
    padding: 5,
  },
});
