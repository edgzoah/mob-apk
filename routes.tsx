import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import TypeScreen from "./TypeScreen";
import Pokemon from "./Pokemon";
import { NavigationProps } from "./types";

const Stack = createNativeStackNavigator<NavigationProps>();



const Routes: React.FC = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="TypeScreen" component={TypeScreen} />
          <Stack.Screen name="Pokemon" component={Pokemon} />
          
        </Stack.Navigator>
      </NavigationContainer>
    )
};

export default Routes;