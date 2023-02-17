/** @format */

import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { map } from "lodash";
import ScreenLoading from "../ScreenLoading";
import Product from "./Product";
import { getProductApi } from "../../api/Product";
import { Divider } from "react-native-paper";

export default function ProductList(props) {
  const {
    cart,
    products,
    setProducts,
    setReloadCart,
    setTotalPayment,
    reloadCart,
  } = props;

  const calcPrice = (price, discount, quantity) => {
    if (!discount) return price * parseInt(quantity);

    const discountAmount = (price * discount) / 100;

    const priceTemp = price - discountAmount;
    return priceTemp * parseInt(quantity);
  };

  useEffect(() => {
    (async () => {
      const productTemp = [];
      let totalPaymentTemp = 0;
      for await (const product of cart) {
        const response = await getProductApi(product.idProduct);
        response.quantity = product.quantity;

        productTemp.push(response);
        const priceProduct = calcPrice(
          response.price,
          response.discount,
          product.quantity
        );

        totalPaymentTemp += priceProduct;
      }
      setProducts(productTemp);
      setTotalPayment(totalPaymentTemp);
      setReloadCart(false);
    })();
  }, [cart]);

  return (
    <View>
      <Text style={styles.title}>Carrito de compra</Text>
      <Divider style={styles.divider} />
      {!products ? (
        <ScreenLoading text='Cargando carrito' size='large' />
      ) : (
        map(products, (product) => (
          <Product
            key={product._id}
            product={product}
            setReloadCart={setReloadCart}
            reloadCart={reloadCart}
          />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 5,
  },
  divider: {
    padding: 5,
  },
});
