/** @format */

import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function NotProducts() {
  return (
    <View style={styles.container}>
      <Text style={styles.textBold}> Carrito de Compra </Text>
      <Text style={styles.text}> Aun no tienes productos Agregado</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
  textBold: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
