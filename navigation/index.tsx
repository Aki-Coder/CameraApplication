import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { FontAwesome } from '@expo/vector-icons';

import HomeScreen from "../screens/HomeScreen";

import CameraScreen3 from "../screens/CameraScreen3";


export default function Navigation() {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    )
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
    return (
        <BottomTab.Navigator initialRouteName="Home">
            <BottomTab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ size}) =>
                        <FontAwesome
                            name="home"
                            size={size}
                            color="#657ec7"
                        />

                }}
            />
            <BottomTab.Screen
                name="Camera"
                component={CameraScreen3}
                options={{
                    tabBarIcon: ({ size }) =>
                        <FontAwesome
                            name="camera"
                            size={size}
                            color="#657ec7"
                        />,
                       unmountOnBlur:true
                        }}
            />
        </BottomTab.Navigator>
    )

}