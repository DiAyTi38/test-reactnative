import { Slot, Stack } from "expo-router";
import { Text, View } from "react-native"
import { APP_COLOR } from "../utils/constant";

const RootLayout = () => {
    return (
        // <View style ={{ padding: 50}}>
        //     <Text>header</Text>
        //     <Slot/>
        //     <Text>footer</Text>
        // </View>
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
                name="(tabs)"
                options={{headerTitle: "Trang chủ"}}
            />

            <Stack.Screen 
                name="product/index"
                options={{headerTitle: "Sản phẩm"}}
            />

            <Stack.Screen 
                name="(auth)/login"
                options={{headerTitle: "Đăng nhập"}}
            />

        </Stack>
    )
}

export default RootLayout;