/** @format */

import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Button, Text, IconButton } from "react-native-paper";
import colors from "../../styles/colors";

export default function Quantity2(props) {
  const { quantity, setQuantity } = props;
  // console.log(quantity);

  // Decrementa en uno
  const decreaseOne = () => {
    if (quantity > 1) {
      const newQuantity = parseInt(quantity) - 1;
      setQuantity(newQuantity);
    }
  };

  // incrementa en uno la cantidad
  const increaseOne = () => {
    const newQuantity = parseInt(quantity) + 1;
    setQuantity(newQuantity);
  };

  return (
    <View style={styles.container}>
      <IconButton
        icon='minus'
        size={25}
        style={styles.btnQuantity}
        iconColor={colors.bgLight}
        onPress={() => decreaseOne()}
      />

      <TextInput
        style={styles.textInput}
        value={quantity.toString()}
        onChangeText={(quantity) => setQuantity(quantity)}
      />

      <IconButton
        icon='plus'
        size={25}
        iconColor={colors.bgLight}
        style={styles.btnQuantity}
        onPress={() => increaseOne()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
  },

  btnQuantity: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    margin: 0,
  },

  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  textInput: {
    fontSize: 18,
  },
});
