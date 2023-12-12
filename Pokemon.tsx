import { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import axios from "axios";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationProps } from "./types";

SplashScreen.preventAutoHideAsync();

type Props = NativeStackScreenProps<NavigationProps, "Pokemon">;

const Pokemon: React.FC<Props> = ({ navigation, route }) => {
  const name = route.params.name;
  const [pokemonData, setPokemonData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  // async function getPokemon() {
  //   const api = axios.create({ baseURL: "https://pokeapi.co/api/v2" });
  //   const response = await api.get('/pokemon/' + name);

  //   if (response.status === 200) {
  //     pokemonData = response;
  //     console.log(response);
  //   }
  // }
  // getPokemon();
  // console.log(pokemonData);

  useEffect(() => {
    const init = async () => {
      const api = axios.create({ baseURL: "https://pokeapi.co/api/v2" });
      const response = await api.get("/pokemon/" + name);

      if (response.status === 200) {
        console.log(response.data.sprites.front_default);
        setPokemonData(response.data);
        setLoading(false);
      }
    };

    init();
  }, []);
  // useEffect(() => {
  // const init = async() => {
  //     const api = axios.create({ baseURL: "https://pokeapi.co/api/v2" });
  //     const response = await api.get('/pokemon/' + name);

  //     if (response.status === 200) {
  //       setPokemonsData(response.data.results);
  //       console.log(response);
  //     }
  //   }
  //   init();
  // }, [])

  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/pokemon_fire_red.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <ScrollView>
      {!loading && (
        <View onLayout={onLayoutRootView}>
          <TouchableWithoutFeedback>
            <View>
              <View style={styles.header}>
                <Text style={styles.title}>Pokédex</Text>
              </View>

              <View>
                <Text style={styles.id}>#{pokemonData.id}</Text>
                <Text style={styles.h1}>{capitalizeFirstLetter(name)}</Text>
                <Image
                style={styles.image}
                  source={{ uri: pokemonData.sprites.front_default }}
                />
                <View style={styles.box}>
              <Text>Height: {pokemonData.height}</Text>
              <Text>Weight: {pokemonData.weight}</Text>
              <Text>Base experience: {pokemonData.base_experience}</Text>
              <Text>Abilities: {pokemonData.abilities[0].ability.name}</Text>
              {pokemonData.types.map((type: any) => (
                <Text key={type.type.name}>Type: {type.type.name}</Text>
              ))}
              </View>

              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Inter-Black",
    fontSize: 50,
    color: "white",
    padding: 15,
  },
  box: {
    fontFamily: "Inter-Black",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "#d2d2d2",
    padding: 10,
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  h1: {
    fontFamily: "Inter-Black",
    fontSize: 50,
    color: "black",
    padding: 15,
    marginLeft: "auto",
    marginRight: "auto",
  },
  header: {
    fontFamily: "Inter-Black",
    backgroundColor: "#bd4c37",
    height: 100,
    justifyContent: "center",
  },
  types: {
    fontFamily: "Inter-Black",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
  container: {
    fontFamily: "Inter-Black",
    justifyContent: "center",
  },
  header2: {
    color: "#bd4c37",
  },
  id: {
    fontFamily: "Inter-Black",
    fontSize: 30,
    color: "black",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    marginBottom: -10,
  },
  image: {
    height: 400,
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: '#d2d2d2',
  }
});

export default Pokemon;
