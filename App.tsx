import { useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
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

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.title}>Pokédex  </Text>
      </View>
      {/* body */}
      <Text style={{ fontFamily: 'Inter-Black', fontSize: 30 }}>Inter Black</Text>
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

  },
  container: {
    fontFamily: 'Inter-Black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8e9e7',
    color: '#22201d',
  },
  header2: {
    color: '#bd4c37',
  }
});
