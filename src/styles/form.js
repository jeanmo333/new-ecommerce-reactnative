/** @format */

import { StyleSheet } from "react-native";
import colors from "./colors";

const formStyle = StyleSheet.create({
  input: {
    marginBottom: 20,
  },
  btnSuccess: {
    padding: 5,
    backgroundColor: colors.primary,
  },
  btnText: {
    marginTop: 5,
  },
  btnTextLabel: {
    color: colors.dark,
    textTransform: "uppercase",
  },
});

export default formStyle;
