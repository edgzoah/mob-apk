import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./Pages/HomeScreen";
import TypeScreen from "./Pages/TypeScreen";
import { NavigationProps } from "./types";

const Stack = createNativeStackNavigator<NavigationProps>();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="TypeScreen" component={TypeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
