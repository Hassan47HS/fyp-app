import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>PHILTER</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "red",
    fontSize: 45,
    fontWeight: "bold",
  },
});
