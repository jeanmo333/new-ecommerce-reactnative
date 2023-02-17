/** @format */

import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import RegisterForm from "../components/auth/RegisterForm";
import logo from "../../assets/logo.png";
import LoginForm from "../components/auth/LoginForm";
import { layoutStyle } from "../styles";

export default function AuthScreen() {
  const [showLogin, setShowLogin] = useState(true);

  const changeForm = () => setShowLogin(!showLogin);

  return (
    <View style={layoutStyle.container}>
      <Image style={styles.logo} source={logo} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        {showLogin ? (
          <LoginForm changeForm={changeForm} />
        ) : (
          <RegisterForm changeForm={changeForm} />
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
    marginTop: 70,
  },
});
