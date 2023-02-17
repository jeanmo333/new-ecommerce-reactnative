/** @format */

import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Button, IconButton } from "react-native-paper";
import { API_URL } from "../../utils/constants";
import {
  deleteProductCartApi,
  decreaseProductCartApi,
  increaseProductCartApi,
} from "../../api/Cart";
import colors from "../../styles/colors";
import format from "../../utils/format";

export default function Product(props) {
  const { product, setReloadCart, reloadCart } = props;
  const [loading, setLoading] = useState(false);

  const calcPrice = (price, discount, quantity) => {
    if (!discount) return price * parseInt(quantity);

    const discountAmount = (price * discount) / 100;

    //return (price - discountAmount).toFixed(2);

    const priceTemp = (price - discountAmount).toFixed(2);
    return priceTemp * parseInt(product.quantity);
  };

  const deleteProductCart = async () => {
    const response = await deleteProductCartApi(product._id);
    if (response) setReloadCart(true);
  };

  const decreaseProductCart = async () => {
    const response = await decreaseProductCartApi(product._id);
    if (response) setReloadCart(true);
  };
  const increaseProductCart = async () => {
    const response = await increaseProductCartApi(product._id);
    if (response) setReloadCart(true);
  };

  return (
    <View key={product._id} style={styles.product}>
      <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={{
            uri: `${API_URL}${product.main_image.url}`,
          }}
        />
      </View>
      <View style={styles.info}>
        <View>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>
            {product.title}
          </Text>
          <View style={styles.prices}>
            <Text style={styles.currentPrice}>
              {format(
                calcPrice(product.price, product.discount, product.quantity)
              )}
            </Text>
          </View>
        </View>
        <View style={styles.btnsContainer}>
          <View style={styles.selectQuantity}>
            <IconButton
              icon='plus'
              iconColor={colors.bgLight}
              size={25}
              style={styles.btnQuantity}
              onPress={increaseProductCart}
            />
            <TextInput
              value={product.quantity.toString()}
              style={styles.inputQuantity}
            />
            <IconButton
              icon='minus'
              iconColor={colors.bgLight}
              size={25}
              style={styles.btnQuantity}
              onPress={decreaseProductCart}
            />
          </View>
          <Button
            style={styles.btnDelete}
            mode='contained'
            onPress={deleteProductCart}>
            Eliminar
          </Button>
        </View>
      </View>
      {/* {loading && (
        <View style={styles.reload}>
          <ActivityIndicator size='large' color='#fff' />
          <Text style={styles.reloadText}>Cargando...</Text>
        </View>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  product: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#dadde1",
    height: 200,
    position: "relative",
  },
  containerImage: {
    width: "40%",
    height: 200,
    backgroundColor: "#ebebeb",
    padding: 5,
  },
  image: {
    height: "100%",
    resizeMode: "contain",
  },
  info: {
    padding: 10,
    width: "60%",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  prices: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "flex-end",
  },
  currentPrice: {
    fontSize: 18,
  },
  btnsContainer: {
    justifyContent: "space-between",

    width: "100%",
  },
  selectQuantity: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  btnQuantity: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    margin: 0,
  },
  inputQuantity: {
    paddingHorizontal: 10,
    fontSize: 16,
  },
  btnDelete: {
    backgroundColor: colors.danger,
  },
  reload: {
    backgroundColor: "#000",
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.3,
    alignItems: "center",
    justifyContent: "center",
  },
});
