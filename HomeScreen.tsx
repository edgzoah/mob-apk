import { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Image, TouchableHighlight, ScrollView, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import axios from 'axios';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationProps } from './types';

SplashScreen.preventAutoHideAsync();


interface Type {
  name: string,
  url: string,
  sprites: {
    front_default: string,
  }
}

const pokemonList = [
  {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/bulbasaur/",
    sprites: {
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    },
    types: [
      {
        type: {
          name: "grass",
        }
      },
      {
        type: {
          name: "poison",
        }
      }
    ]
  },
  {
    name: "ivysaur",
    url: "https://pokeapi.co/api/v2/pokemon/ivysaur/",
    sprites: {
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
    },
    types: [
      {
        type: {
          name: "grass",
        }
      },
      {
        type: {
          name: "poison",
        }
      }
    ]
  },
  {
    name: "venusaur",
    url: "https://pokeapi.co/api/v2/pokemon/venosaur/",
    sprites: {
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
    },
    types: [
      {
        type: {
          name: "grass",
        }
      },
      {
        type: {
          name: "poison",
        }
      }
    ]
  },
  {
    name: "charmander",
    url: "https://pokeapi.co/api/v2/pokemon/charmander/",
    sprites: {
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    },
    types: [
      {
        type: {
          name: "fire",
        }
      }
    ]
  },
  {
    name: "charmeleon",
    url: "https://pokeapi.co/api/v2/pokemon/charmeleon/",
    sprites: {
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
    },
    types: [
      {
        type: {
          name: "fire",
        }
      }
    ]
  },
  {
    name: "charizard",
    url: "https://pokeapi.co/api/v2/pokemon/charizard/",
    sprites: {
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
    },
    types: [
      {
        type: {
          name: "fire",
        }
      },
      {
        type: {
          name: "flying",
        }
      }
    ]
  },
  {
    name: "squirtle",
    url: "https://pokeapi.co/api/v2/pokemon/squirtle/",
    sprites: {
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    },
    types: [
      {
        type: {
          name: "water",
        }
      }
    ]
  },
  {
    name: "wartortle",
    url: "https://pokeapi.co/api/v2/pokemon/wartortle/",
    sprites: {
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
    },
    types: [
      {
        type: {
          name: "water",
        }
      }
    ]
  },
  {
    name: "blastoise",
    url: "https://pokeapi.co/api/v2/pokemon/blastoise/",
    sprites: {
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
    },
    types: [
      {
        type: {
          name: "water",
        }
      }
    ]
  },
  {
    name: "caterpie",
    url: "https://pokeapi.co/api/v2/pokemon/caterpie/",
    sprites: {
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png",
    },
    types: [
      {
        type: {
          name: "bug",
        }
      }
    ]
  },
  {
    name: "metapod",
    url: "https://pokeapi.co/api/v2/pokemon/metapod/",
    sprites: {
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png",
    },
    types: [
      {
        type: {
          name: "bug",
        }
      }
    ]
  },
  {
    name: "butterfree",
    url: "https://pokeapi.co/api/v2/pokemon/butterfree/",
    sprites: {
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
    },
    types: [
      {
        type: {
          name: "bug",
        }
      },
      {
        type: {
          name: "flying",
        }
      }
    ]
  }
]
type Props = NativeStackScreenProps<NavigationProps, "HomeScreen">

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  // const [pokemonsList, setPokemonsList] = useState<Type[]>([]);


  // useEffect(() => {
  //   const init = async() => {
  //     const api = axios.create({ baseURL: "https://pokeapi.co/api/v2" });
  //     const response = await api.get('/pokemon');
      
  //     if (response.status === 200) {
  //       const pokemonsArray: Type[] = response.data.results.slice(0, 12)
  //       const helpArray = []
  //       for await (const pokemon of pokemonsArray) {
  //         const response = await api.get(pokemon.url)
  //         helpArray.push(response.data);
  //       }
  //       setPokemonsList(helpArray)
  //     };
  //   }
  //   init();
  // }, [])
  // console.log(pokemonsList);

  const [fontsLoaded] = useFonts({
    'Inter-Black': require('./assets/fonts/pokemon_fire_red.ttf')
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
    // scroll pls
    <ScrollView>
    <View onLayout={onLayoutRootView}>
      <TouchableWithoutFeedback>
  <View>
    <View style={styles.header}>
      <Text style={styles.title}>Pokédex</Text>
    </View>
    <View>
    <Text>All pokemons</Text>
    <View>
      <TextInput placeholder="Search pokemon" onChangeText={(text) => console.log(text)} />
    </View>
      {pokemonList.map((pokemon, index) => {
        return (
        <TouchableHighlight key={index} onPress={() => navigation.navigate("Pokemon", { name: pokemon.name })}>
        <View key={pokemon.url} style={styles.box}>
          <Text>{capitalizeFirstLetter(pokemon.name)}</Text>
          <Image style={{
            height: 50,
            width: 50,
          }} source={{ uri: pokemon.sprites.front_default }} />
        </View>
        </TouchableHighlight>
        )})}
    </View>    
  </View>
</TouchableWithoutFeedback>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Inter-Black',
    fontSize: 50,
    color: 'white',
    padding: 15,
  },
  header: {
    fontFamily: 'Inter-Black',
    backgroundColor: '#bd4c37',
    height: 100,
    justifyContent: 'center',

  },
  box: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

});

export default HomeScreen;
