import ShareButton from "@/components/button/share.button";
import { StyleSheet, Text, View } from "react-native";
import { APP_COLOR } from "../utils/constant";
import { SafeAreaView } from "react-native-safe-area-context";
import ShareInput from "@/components/input/share.input";
import SocialButton from "@/components/button/social.button";
import { Link } from "expo-router";
import { useState } from "react";

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
                            onPress= {() => {console.log(name, email, password)}}
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