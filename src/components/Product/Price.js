/** @format */

import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../../styles/colors";
import format from "../../utils/format";

export default function Price(props) {
  const { price, discount } = props;

  const calcPrice = (price, discount) => {
    if (!discount) return price;

    const discountAmount = (price * discount) / 100;
    return price - discountAmount;
  };

  return (
    <View style={styles.prices}>
      {discount && (
        <View style={styles.conatinerData}>
          <Text style={styles.dataText}>Precio normal:</Text>
          <Text style={[styles.dataValue, styles.oldPrice]}>
            {format(price)}
          </Text>
        </View>
      )}
      <View style={styles.conatinerData}>
        <Text style={styles.dataText}>Precio ahora:</Text>
        <Text style={[styles.dataValue, styles.currentPrice]}>
          {format(calcPrice(price, discount))}
        </Text>
      </View>

      {discount && (
        <View style={styles.conatinerData}>
          <Text style={styles.dataText}>Ahorras:</Text>
          <Text style={[styles.dataValue, styles.saving]}>
            {format((price * discount) / 100)} ({discount}%)
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  conatinerData: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    marginLeft: 55,
    marginTop: 0,
  },
  dataText: {
    fontSize: 18,
    color: "#747474",
    textAlign: "right",
  },
  dataValue: {
    fontSize: 16,
    paddingLeft: 5,
  },
  oldPrice: {
    textDecorationLine: "line-through",
  },
  currentPrice: {
    fontSize: 18,
  },
  saving: {
    color: colors.primary,
  },
});
