/** @format */

import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import * as yup from "yup";
import Toast from "react-native-root-toast";
import { registerApi } from "../../api/user";
import { formStyle } from "../../styles";

export default function RegisterForm(props) {
  const { changeForm } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        await registerApi(formData);
        Toast.show("registrado con exito", {
          position: Toast.positions.CENTER,
        });
        changeForm();
      } catch (error) {
        console.log(error);
        Toast.show("Hubo un Error al registrar", {
          position: Toast.positions.CENTER,
        });
        setLoading(false);
      }
    },
  });

  return (
    <View>
      <TextInput
        label='Email'
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        value={formik.values.email}
        error={formik.errors.email}
      />

      <TextInput
        label='Usuario'
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("username", text)}
        value={formik.values.username}
        error={formik.errors.username}
      />

      <TextInput
        label='Contraseña'
        style={formStyle.input}
        secureTextEntry
        onChangeText={(text) => formik.setFieldValue("password", text)}
        value={formik.values.password}
        error={formik.errors.password}
      />

      <TextInput
        label='Repetir contraseña'
        style={formStyle.input}
        secureTextEntry
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        value={formik.values.repeatPassword}
        error={formik.errors.repeatPassword}
      />

      <Button
        mode='contained'
        style={formStyle.btnSuccess}
        onPress={formik.handleSubmit}
        loading={loading}>
        Registrarse
      </Button>

      <Button
        mode='text'
        style={formStyle.btnText}
        labelStyle={formStyle.btnTextLabel}
        onPress={changeForm}>
        Iniciar Sesion
      </Button>
    </View>
  );
}

function initialValues() {
  return {
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  };
}

function validationSchema() {
  return {
    email: yup.string().email(true).required(true),
    username: yup.string().required(true),
    password: yup.string().required(true),
    repeatPassword: yup
      .string()
      .required(true)
      .oneOf([yup.ref("password")], true),
  };
}
