/** @format */

import React, { useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import StatusBar from "../../components/StatusBar";
import { getMeApi, updateUserApi } from "../../api/user";
import useAuth from "../../hooks/useAuth";
import colors from "../../styles/colors";
import { formStyle } from "../../styles";
import ScreenLoading from "../../components/ScreenLoading";

export default function ChangeEmail() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingSreen, setLoadingSreen] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setLoadingSreen(true);
        const response = await getMeApi(auth.token);
        setLoadingSreen(false);
        await formik.setFieldValue("email", response.email);
      })();
    }, [])
  );

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        const response = await updateUserApi(auth, formData);
        if (response.statusCode) throw "El email ya existe";
        navigation.goBack();
        Toast.show(" El cambio fue con exito", {
          position: Toast.positions.CENTER,
        });
      } catch (error) {
        Toast.show(error, {
          position: Toast.positions.CENTER,
        });
        formik.setFieldError("email", true);
      }
      setLoading(false);
    },
  });

  if (loadingSreen) return <ScreenLoading size='large' />;

  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle='light-content' />
      <View style={styles.container}>
        <TextInput
          label='Email'
          style={formStyle.input}
          onChangeText={(text) => formik.setFieldValue("email", text)}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Button
          mode='contained'
          style={formStyle.btnSuccess}
          onPress={formik.handleSubmit}
          loading={loading}>
          Cambiar email
        </Button>
      </View>
    </>
  );
}

function initialValues() {
  return {
    email: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string().email(true).required(true),
  };
}

var styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
