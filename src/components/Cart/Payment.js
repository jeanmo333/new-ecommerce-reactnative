/** @format */
import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button, Divider } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { paymentCartApi, deleteCartApi } from "../../api/Cart";
import useAuth from "../../hooks/useAuth";
import { STRAPI_PUBLISHABLE_KEY } from "../../utils/constants";
import { formStyle } from "../../styles";
import colors from "../../styles/colors";
import format from "../../utils/format";
const stripe = require("stripe-client")(STRAPI_PUBLISHABLE_KEY);

export default function Payment(props) {
  const { totalPayment, selectedAddress, products } = props;
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      // console.log(formData);
      setLoading(true);
      const result = await stripe.createToken({ card: formData });
      //console.log(result);
      if (result?.error) {
        Toast.show(result.error.message, {
          position: Toast.positions.CENTER,
        });
        setLoading(false);
        return;
      } else {
        if (!selectedAddress) {
          Toast.show("Debe seleccionar una direccion", {
            position: Toast.positions.CENTER,
          });
          setLoading(false);
          return;
        }
        const response = await paymentCartApi(
          auth,
          result.id,
          products,
          selectedAddress
        );

        // console.log(response);
        setLoading(false);

        if (size(response) > 0) {
          // console.log("Pedido completado");
          await deleteCartApi();
          navigation.navigate("account", { screen: "orders" });

          Toast.show("Pedido completado con exito", {
            position: Toast.positions.CENTER,
          });
        } else {
          Toast.show("Error al realizar el pedido", {
            position: Toast.positions.CENTER,
          });
          setLoading(false);
        }
      }
    },
  });

  return (
    <View style={styles.continer}>
      <Text style={styles.containerTitle}>Forma de pago</Text>
      <Divider style={styles.divider} />
      <TextInput
        label='Nombre de la tarjeta'
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("name", text)}
        value={formik.values.name}
        error={formik.errors.name}
      />
      <TextInput
        label='Numero de tarjeta'
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("number", text)}
        value={formik.values.number}
        error={formik.errors.number}
      />
      <View style={styles.containerInputs}>
        <View style={styles.containerMonthYearInputs}>
          <TextInput
            label='Mes'
            style={styles.inputDate}
            onChangeText={(text) => formik.setFieldValue("exp_month", text)}
            value={formik.values.exp_month}
            error={formik.errors.exp_month}
          />
          <TextInput
            label='Año'
            style={styles.inputDate}
            onChangeText={(text) => formik.setFieldValue("exp_year", text)}
            value={formik.values.exp_year}
            error={formik.errors.exp_year}
          />
        </View>
        <TextInput
          label='CVV/CVC'
          style={styles.inputCvc}
          onChangeText={(text) => formik.setFieldValue("cvc", text)}
          value={formik.values.cvc}
          error={formik.errors.cvc}
        />
      </View>

      <Button
        mode='contained'
        contentStyle={styles.btnContent}
        labelStyle={styles.btnText}
        onPress={formik.handleSubmit}
        loading={loading}>
        Pagar: {totalPayment && `${format(totalPayment)}`}
      </Button>
    </View>
  );
}

function initialValues() {
  return {
    number: "",
    exp_month: "",
    exp_year: "",
    cvc: "",
    name: "",
  };
}

function validationSchema() {
  return {
    number: Yup.string().min(16).max(16).required(true),
    exp_month: Yup.string().min(2).max(2).required(true),
    exp_year: Yup.string().min(2).max(2).required(true),
    cvc: Yup.string().min(3).max(3).required(true),
    name: Yup.string().min(6).required(true),
  };
}

const styles = StyleSheet.create({
  continer: {
    marginTop: 40,
    marginBottom: 30,
  },
  containerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  containerInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  inputCvc: {
    width: "40%",
  },
  containerMonthYearInputs: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  inputDate: {
    width: 100,
    marginRight: 10,
  },
  btnContent: {
    paddingVertical: 4,
    backgroundColor: colors.primary,
  },
  btnText: {
    fontSize: 15,
  },
  divider: {
    padding: 5,
    marginBottom: 10,
  },
});
