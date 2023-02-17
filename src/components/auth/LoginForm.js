/** @format */

import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import * as yup from "yup";
import Toast from "react-native-root-toast";
import useAuth from "../../hooks/useAuth";
import { formStyle } from "../../styles";
import { loginApi } from "../../api/user";

export default function LoginForm(props) {
  const { changeForm } = props;
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        const response = await loginApi(formData);
        if (response.statusCode) throw "usuario o Contraseña incorrecto";
        login(response);
      } catch (error) {
        Toast.show(error, {
          position: Toast.positions.CENTER,
        });

        setLoading(false);
      }
    },
  });
  return (
    <View>
      <View>
        <TextInput
          label='Email o Username'
          style={formStyle.input}
          onChangeText={(text) => formik.setFieldValue("identifier", text)}
          value={formik.values.identifier}
          error={formik.errors.identifier}
        />

        <TextInput
          label='Contraseña'
          style={formStyle.input}
          secureTextEntry
          onChangeText={(text) => formik.setFieldValue("password", text)}
          value={formik.values.password}
          error={formik.errors.password}
        />

        <Button
          mode='contained'
          style={formStyle.btnSuccess}
          onPress={formik.handleSubmit}
          loading={loading}>
          Ingresar
        </Button>

        <Button
          mode='text'
          style={formStyle.btnText}
          labelStyle={formStyle.btnTextLabel}
          onPress={changeForm}>
          Registrarse
        </Button>
      </View>
    </View>
  );
}

function initialValues() {
  return {
    identifier: "",
    password: "",
  };
}

function validationSchema() {
  return {
    identifier: yup.string().required(true),
    password: yup.string().required(true),
  };
}
