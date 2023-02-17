/** @format */

import React, { useState } from "react";
import { StyleSheet, View, Text, Image, ActivityIndicator } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../../utils/constants";
import { deleteFavoriteApi } from "../../api/Favorite";
import format from "../../utils/format";
import colors from "../../styles/colors";

export default function Product(props) {
  const { item, auth, setReloadFavorite } = props;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const calcPrice = (price, discount) => {
    if (!discount) return price;

    const discountAmount = (price * discount) / 100;
    return price - discountAmount;
  };

  const goToProduct = (id) => {
    navigation.navigate("product", { idProduct: id });
  };

  const deleteFavorite = async (id) => {
    setLoading(true);
    await deleteFavoriteApi(auth, id);
    setReloadFavorite(true);
    setLoading(false);
  };

  return (
    <View key={item._id} style={styles.product}>
      <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={{
            uri: `${API_URL}${item.product.main_image.url}`,
          }}
        />
      </View>
      <View style={styles.info}>
        <View>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>
            {item.product.title}
          </Text>
          <View style={styles.prices}>
            <Text style={styles.currentPrice}>
              {format(calcPrice(item.product.price, item.product.discount))}
            </Text>
          </View>
        </View>
        <View style={styles.btnsContainer}>
          <Button
            style={styles.btnVerProducto}
            mode='contained'
            onPress={() => goToProduct(item.product._id)}>
            Ver producto
          </Button>

          <Button
            style={styles.btnDelete}
            mode='contained'
            onPress={() => deleteFavorite(item.product._id)}>
            Eliminar
          </Button>
        </View>
      </View>

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size='large' color='#fff' />
        </View>
      )}
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
    marginTop: 5,
  },
  currentPrice: {
    fontSize: 18,
  },
  oldPrice: {
    marginLeft: 7,
    fontSize: 14,
    color: "#747474",
    textDecorationLine: "line-through",
  },
  btnsContainer: {
    justifyContent: "space-between",
    width: "100%",
  },
  btnDelete: {
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  btnVerProducto: {
    marginBottom: 15,
    backgroundColor: colors.primary,
  },
  btnDelete: {
    backgroundColor: colors.danger,
  },
  loading: {
    backgroundColor: "#000",
    opacity: 0.4,
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 5,
    justifyContent: "center",
  },
});
