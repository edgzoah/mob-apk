import { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Linking } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import axios from 'axios';

SplashScreen.preventAutoHideAsync();


interface Type {
  name: string,
  url: string,
}

export default function TypeScreen() {
  const [typesList, setTypesList] = useState<Type[]>([]);
  
  useEffect(() => {
    const init = async() => {
      const api = axios.create({ baseURL: "https://pokeapi.co/api/v2" });
      const response = await api.get('/type');

      if (response.status === 200) {
        setTypesList(response.data.results);
      };
    }
    init();
  }, [])

  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../assets/fonts/pokemon_fire_red.ttf')
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
    <View style={styles.header} onLayout={onLayoutRootView}>
    </View>
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
    fontSize: 'i0px',
    width: '100%',
    position: 'absolute',
    top: 0,
    backgroundColor: '#b0b228',
    height: 100,
    justifyContent: 'center',

  }

});
