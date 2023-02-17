/** @format */

import React, { useState, useCallback } from "react";
import { StyleSheet, ScrollView, Text, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { size } from "lodash";
import ListOrder from "../../components/Order/ListOrder";
import { getOrdersApi } from "../../api/Order";
import StatusBar from "../../components/StatusBar";
import useAuth from "../../hooks/useAuth";
import colors from "../../styles/colors";
import { Divider } from "react-native-paper";

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getOrdersApi(auth);
        setOrders(response);
      })();
    }, [])
  );

  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle='light-content' />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Listado de compras</Text>
        <Divider style={styles.divider} />

        {!orders ? (
          <ActivityIndicator size='large' style={styles.loading} />
        ) : size(orders) === 0 ? (
          <Text style={styles.noOrdersText}>Aun no tienes compra agregado</Text>
        ) : (
          <ListOrder orders={orders} />
        )}
      </ScrollView>
    </>
  );
}

var styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
  addAddress: {
    borderWidth: 0.9,
    borderRadius: 5,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noOrdersText: {
    textAlign: "center",
    paddingTop: 20,
  },
  loading: {
    marginTop: 20,
  },
  divider: {
    padding: 5,
  },
});
