import { Slot, Stack } from "expo-router";
import { Text, View } from "react-native"
import { APP_COLOR } from "../utils/constant";
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaView } from "react-native-safe-area-context";

const RootLayout = () => {
    return (
        <RootSiblingParent>
            <SafeAreaView style={{flex: 1}}>
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
                options={{headerTitle: "Trang chủ"}}
            />

            <Stack.Screen 
                name="product/index"
                options={{headerTitle: "Sản phẩm"}}
            />

            <Stack.Screen 
                name="(auth)/login"
                options={{
                    headerTitle: "Đăng nhập",
                    headerShown: false
                }}
            />

                </Stack>
            </SafeAreaView>
        </RootSiblingParent>
    )
}

export default RootLayout;