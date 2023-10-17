import { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import axios from "axios";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationProps } from "../types";

SplashScreen.preventAutoHideAsync();

interface Type {
  name: string;
  url: string;
}

type Props = NativeStackScreenProps<NavigationProps, "HomeScreen">;

const HomeScreen: React.FC<Props> = ({ navigation, route }) => {
  const [typesList, setTypesList] = useState<Type[]>([]);

  useEffect(() => {
    const init = async () => {
      const api = axios.create({ baseURL: "https://pokeapi.co/api/v2" });
      const response = await api.get("/type");

      if (response.status === 200) {
        setTypesList(response.data.results);
      }
    };
    init();
  }, []);

  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../assets/fonts/pokemon_fire_red.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <TouchableWithoutFeedback>
        <>
          <View style={styles.header}>
            <Text style={styles.title}>Pokédex </Text>
          </View>
          <Text style={styles.header2}>Types</Text>
            {typesList.map((type) => (
              <Text
                key={type.url}
                onPress={() =>
                  navigation.navigate("TypeScreen", {
                    name: type.name,
                  })
                }
              >
                {type.name}
              </Text>
            ))} 
        </>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Inter-Black",
    fontSize: 50,
    color: "white",
    padding: 15,
  },
  header: {
    fontFamily: "Inter-Black",
    fontSize: "i0px",
    width: "100%",
    position: "absolute",
    top: 0,
    backgroundColor: "#b0b228",
    height: 100,
    justifyContent: "center",
  },
  container: {
    fontFamily: "Inter-Black",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8e9e7",
    color: "#22201d",
  },
  header2: {
    color: "#bd4c37",
  },
});

export default HomeScreen;
