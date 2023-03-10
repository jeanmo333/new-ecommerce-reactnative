/** @format */

import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { IconButton } from "react-native-paper";

export default function UserInfo(props) {
  const { user } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bienvenido : {""}
        <Text style={styles.titleName}>
          {user.name && user.lastname
            ? `${user.name} ${user.lastname}`
            : user.username}
        </Text>
      </Text>
      <Text style={styles.title}>
        Tu email es: <Text style={styles.titleName}>{user.email}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
  },
  titleName: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
