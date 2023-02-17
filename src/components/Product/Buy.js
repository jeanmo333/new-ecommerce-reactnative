/** @format */

import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Toast from "react-native-root-toast";
import { addProductCartApi, getProductCartApi } from "../../api/Cart";

export default function Actions(props) {
  const { product, quantity } = props;

  // useEffect(() => {
  //   (async () => {
  //     console.log(await getProductCartApi());
  //   })();
  // }, []);

  const addProductCart = async () => {
    const response = await addProductCartApi(product._id, quantity);
    if (response) {
      Toast.show("Producto añadido al carrito con exito", {
        position: Toast.positions.CENTER,
      });
    } else {
      Toast.show("ERROR al añadir el producto al carrito", {
        position: Toast.positions.CENTER,
      });
    }
  };

  return (
    <Button
      mode='contained'
      contentStyle={styles.btnBuyContent}
      labelStyle={styles.btnLabel}
      style={styles.btn}
      onPress={addProductCart}>
      Añadir al carrito
    </Button>
  );
}

const styles = StyleSheet.create({
  btnLabel: {
    fontSize: 18,
  },
  btn: {
    marginTop: 20,
  },
  btnBuyContent: {
    backgroundColor: "#008fe9",
    paddingVertical: 5,
  },
});
