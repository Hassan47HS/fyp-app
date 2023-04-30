import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { products } from "../utils";
import { useIsFocused } from "@react-navigation/native";

export default function BarcodeScanner({
  Navigation,
  text,
  setText,
  scanned,
  setScanned,
}) {
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);

  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };
  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    // console.log("here", type, data);
    // if (!scanned) {
    // setScanned(true);
    console.log("here");
    setText(data);
    if (products[data]) {
      Navigation.navigate("Philter original");
    } else {
      Navigation.navigate("Philter Fake");
    }

    console.log(`Type: ${type}\nData: ${data}`);
    // }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>No access to camera</Text>
        <Button title="Allow Camera" onPress={askForCameraPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.barcodeBox}>
        {isFocused ? (
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={styles.barcodeScanner}
          />
        ) : null}
      </View>
      <Text style={styles.text}>{text}</Text>
      {/* {scanned && (
        <Button
          title="Scan Again ?"
          onPress={() => {
            setScanned(false);
            setText("Scanning ...");
          }}
          color="tomato"
        />
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  message: {
    margin: 10,
  },
  barcodeBox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
  },
  barcodeScanner: {
    height: 400,
    width: 400,
  },
  text: {
    fontSize: 18,
    margin: 20,
  },
});
