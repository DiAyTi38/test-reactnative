import ShareButton from "@/components/button/share.button";
import { StyleSheet, Text, View } from "react-native";
import { APP_COLOR } from "../../utils/constant";
import { SafeAreaView } from "react-native-safe-area-context";
import ShareInput from "@/components/input/share.input";
import SocialButton from "@/components/button/social.button";
import { Link, router } from "expo-router";
import { useState } from "react";
import axios from "axios";
import { registerAPI } from "../../utils/api";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        gap: 10,
    },
    inputGroup: {
        padding: 5,
        gap: 10,
    },
    text: {
        fontSize: 18,
    },
    input: {
        borderColor: "#d0d0d0",
        borderWidth: 1,
        paddingHorizontal: 7,
        paddingVertical: 10,
        borderRadius: 5,
    },
})
const SignUpPage = () => {

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSignUp = async() => {
        const url = `${process.env.EXPO_PUBLIC_API_URL}/api/v1/auth/register `;
        try {
            const res = await registerAPI(email, password, name);
            if (res.data) {
                router.navigate("/(auth)/vertify");
            }
            console.log (">>> check res: ", res.data)
        } catch (error) {
            console.log (">>> check error: ", error)
        }
    }
    
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style ={styles.container}>
                <View>
                    <Text style ={{
                        fontSize: 25,
                        fontWeight: 600,
                        marginVertical: 30
                    }}>Đăng ký tài khoản</Text>
                </View>

                <ShareInput
                    title= "Họ tên"
                    value = {name}
                    setValue = {setName}
                />

                <ShareInput
                    title= "Gmail"
                    value = {email}
                    setValue = {setEmail}
                    keyboardType= "email-address"
                />

                <ShareInput
                    title= "Password"
                    value = {password}
                    setValue = {setPassword}
                    secureTextEntry = {true}
                />

                <View style={{marginVertical: 10}}/>
                <ShareButton
                    title= "Đăng ký"
                            onPress= {handleSignUp}
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
                    }}>Đã có tài khoản?
                    </Text>
                    <Link href={"/(auth)/signup"}>
                        <Text style={{color: "black", textDecorationLine: "underline"}}>
                            Đăng nhập
                        </Text>
                    </Link>
                </View>

                <SocialButton/>
            </View>
        </SafeAreaView>
    )
}

export default SignUpPage;