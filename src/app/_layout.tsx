import { Slot, Stack } from "expo-router";
import { Text, View } from "react-native"
import { APP_COLOR } from "../utils/constant";
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppProvider from "@/context/app.context";


const RootLayout = () => {
    const navTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,background: 'transparent',
        },
    }
    return (
        <GestureHandlerRootView>
            <RootSiblingParent>
                <AppProvider>
                    <SafeAreaView style={{flex: 1}}>
                <ThemeProvider value={navTheme}>
                    <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: APP_COLOR.ORANGE,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen 
                name="index"
                options={{headerShown: false}}
            />

            <Stack.Screen 
                name="(auth)/signup"
                options={{headerShown: false}}
            />

            <Stack.Screen 
                name="(auth)/vertify"
                options={{headerShown: false}}
            />

            <Stack.Screen 
                name="(tabs)"
                options={{headerShown: false}}
            />

            <Stack.Screen 
                name="product/index"
                options={{headerTitle: "Sản phẩm"}}
            />

            <Stack.Screen 
                name="(auth)/welcome"
                options={{headerShown: false}}
            />

            <Stack.Screen 
                name="(auth)/login"
                options={{
                    headerTitle: "Đăng nhập",
                    headerShown: false
                }}
            />

                    </Stack>
                </ThemeProvider>
                    </SafeAreaView>
                </AppProvider>
            </RootSiblingParent>
        </GestureHandlerRootView>
    )
}

export default RootLayout;