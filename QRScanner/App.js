import BarcodeScanner from "./components/BarcodeScanner";
import Header from "./components/Header";
import splashscreen from "./components/splashScreen";
import React, { useEffect, useState,useCallback } from "react";
import { View, Text, Image,Button, StyleSheet, TouchableOpacity,Linking,StatusBar } from "react-native";
import { WebView} from 'react-native-webview';
// import { openURL } from 'react-native-open-url';
//Navigation import
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { products } from "./utils";
import successfullImage from "./assets/verify.png";
import unsuccessfullImage from "./assets/unvarified.png"


//Screen One
const ScreenOne = (props) => {
  //onPress To Navigate
  const onPress = () => {
    props.navigation.navigate("Philter original");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1, backgroundColor: "black", width: "100%" }}>
        <Header />
        <BarcodeScanner
          Navigation={props.navigation}
          text={props.text}
          setText={props.setText}
          scanned={props.scanned}
          setScanned={props.setScanned}
        />
      </View>
      {/* <TouchableOpacity onPress={onPress}>
        <Text>Hello From Screen One</Text>
      </TouchableOpacity> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container1:{

    justifyContent: 'flex-start',
    // alignItems: 'center',
    // paddingTop: 50,
    // backgroundColor: '#fff',
  },
  container2: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FF0000",
  },
  text1:{
    color: "white",
    fontSize:45,
    fontWeight:"normal",
  },
  text: {
    color: "#FF0000",
    fontWeight: "500",
    fontSize: 20,
  },
  text2: {
    color: "#FF0000",
    fontWeight: "500",
    fontSize: 45,
  },
  logo: {
    width: 180,
    height: 158,
  },
  button:
  { 
    backgroundColor: "Red",
  },
  logo1: {
    width: 202,
    height: 172,
  },
});
//Screen Two
const Philter = (props) => {
  const { Company_name } = products[props.text];
  const { Product_Title } = products[props.text];
  const { Batch_no } = products[props.text];
  const { MFG_Date } = products[props.text];
  const { EXP_Date } = products[props.text];
  const { Product_Description } = products[props.text];
  return (

    <View style={styles.container}>
       <View style={styles.container1}>     
        <Text style={styles.text1} numberOfLines={2}>
        Product is{'\n'}  Original!
        </Text>
      </View>
    <Text>Philter original</Text>
      <Image style={styles.logo} source={successfullImage}></Image>
      {/* <Text style={styles.text}>{props.text}</Text> */}
      <Text style={styles.text}>{Company_name}</Text>
      <Text style={styles.text}>{Product_Title}</Text>
      <Text style={styles.text}>{Batch_no}</Text>
      <Text style={styles.text}>{MFG_Date}</Text>
      <Text style={styles.text}>{EXP_Date}</Text>
      <Text style={styles.text}>{Product_Description}</Text>
    </View>
  );
};

//form code
const supportedURL = 'https://forms.gle/sYysCqp5up1Fjxa27';
const OpenURLButton = ({url, children}) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);
  return <Button title={children} onPress={handlePress} />;
};
const PhilterF = (props) => {
  return (
    <View style={styles.container}>
      <Text>Philter Fake</Text>
      <Image style={styles.logo1} source={unsuccessfullImage}></Image>
      <Text style={styles.text2} numberOfLines={2}>
          No Product{'\n'}   FOUND!
      </Text>
      
      <View style={styles.container2}>
      <OpenURLButton url={supportedURL} >Open Form!</OpenURLButton>
      </View>
    </View>
  );
};

function App() {
  const [showsplashscreen, setsplashscreen] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setsplashscreen(false);
    }, 1000);
  }, []);
  const Stack = createStackNavigator();
  const [text, setText] = useState("Scanning ...");
  const [scanned, setScanned] = useState(false);
  // <StatusBar hidden />
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {showsplashscreen ? (
          <Stack.Screen
          name=" "
            component={splashscreen}
            option={{ headerShown: false }}
          ></Stack.Screen>
        ) : null}
        <Stack.Screen 
        name="Barcode Scanner">
          {(props) => (
            <ScreenOne
              {...props}
              text={text}
              setText={setText}
              scanned={scanned}
              setScanned={setScanned}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Philter original">
          {(props) => <Philter {...props} text={text} setText={setText} />}
        </Stack.Screen>
        <Stack.Screen name="Philter Fake">
          {(props) => <PhilterF {...props} text={text} setText={setText} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
