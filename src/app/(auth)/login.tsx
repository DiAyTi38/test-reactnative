import ShareButton from "@/components/button/share.button";
import SocialButton from "@/components/button/social.button";
import ShareInput from "@/components/input/share.input";
import { loginAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { Link, router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native"
import Toast from "react-native-root-toast";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        gap: 10,
    },

})

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [isLogin, setIsLogin] = useState<boolean>(false);
    const handleLogIn = async() => {

        // const url = `${process.env.EXPO_PUBLIC_API_URL}/api/v1/auth/login `;
        try {
            const res = await loginAPI(email, password);
            
            if (res.data) {
                router.replace({
                    pathname: "/(tabs)",
                })
            } else {
                const m = Array.isArray(res.message) ? res.message[0] : res.message; 
                Toast.show( m, {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: APP_COLOR.ORANGE,
                    opacity: 1,
                });
            }
            if (res.statusCode === 400) {
                router.replace({
                    pathname: "/(auth)/vertify",
                    params: {email: email, isLogin: 1}
                })
            }
        } catch (error) {
            console.log (">>> check error: ", error)
        }
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style = {styles.container}>
                <View>
                    <Text style ={{
                        fontSize: 25,
                        fontWeight: 600,
                        marginVertical: 30
                    }}>Đăng nhập</Text>
                </View>

                <ShareInput
                    title = "Email"
                    value = {email}
                    setValue={setEmail}
                />

                <ShareInput
                    title= "Password"
                    value = {password}
                    setValue = {setPassword}
                    secureTextEntry = {true}
                />

                <View style={{marginVertical: 10}}/>
                <ShareButton
                    title= "Đăng nhập"
                            onPress= {handleLogIn}
                            textStyle = {{ 
                                textTransform: "uppercase",
                                color : "#fff", 
                                paddingVertical: 5}}
                            btnStyle = {{
                                justifyContent: "center",
                                borderRadius: 30,
                                paddingHorizontal: 50,
                                paddingVertical: 10,
                                backgroundColor: APP_COLOR.ORANGE,
                            }}
                    pressStyle = {{alignSelf: "stretch"}}
                />

                <View style ={{
                    marginVertical: 15,
                    flexDirection: "row",
                    gap: 10,
                    justifyContent: "center"
                }}>
                    <Text style = {{
                        color: "black", 
                    }}>Chưa có tài khoản?
                    </Text>
                    <Link href={"/(auth)/signup"}>
                        <Text style={{color: "black", textDecorationLine: "underline"}}>
                            Đăng ký
                        </Text>
                    </Link>
                </View>

                <SocialButton
                    title = "Đăng nhập với"
                />
            </View>
        </SafeAreaView>
    )
}

export default Login;