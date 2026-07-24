import ShareButton from "@/components/button/share.button";
import SocialButton from "@/components/button/social.button";
import ShareInput from "@/components/input/share.input";
import { loginAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { LoginSchema } from "@/utils/validate.schema";
import { Link, router } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import { red } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
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
    const [loading, setLoading] = useState<boolean>(false);
   
    const handleLogIn = async(email: string, password: string) => {

        // const url = `${process.env.EXPO_PUBLIC_API_URL}/api/v1/auth/login `;
        try {
            setLoading(true);
            const res = await loginAPI(email, password);
            setLoading(false);
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
            <Formik
                validationSchema={LoginSchema}
                initialValues={{ email: '', password: '' }}
                onSubmit={values => handleLogIn(values.email, values.password)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors}) => (
                    // <View style={{ margin: 10 }}>
                    //     <Text>Email </Text>
                    //     <TextInput
                    //         style={{ borderWidth: 1, borderColor: "#ccc" }}
                    //         onChangeText={handleChange('email')}
                    //         onBlur={handleBlur('email')}
                    //         value={values.email}
                    //     />
                    //     {errors.email && <Text style={{color: "red"}}>{errors.email}</Text>}
                    //     <View style={{ marginVertical: 10 }}></View>
                    //     <Text>Password</Text>
                    //     <TextInput
                    //         style={{ borderWidth: 1, borderColor: "#ccc" }}
                    //         onChangeText={handleChange('password')}
                    //         onBlur={handleBlur('password')}
                    //         value={values.password}
                    //     />
                    //     {errors.password && <Text style={{color: "red"}}>{errors.password}</Text>}
                    //     <View style={{ marginVertical: 10 }}></View>
                
                    //     <Button onPress={handleSubmit as any} title="Submit" />
                    // </View>
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
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    errors={errors.email}
                />

                <ShareInput
                    title= "Password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry = {true}
                    errors = {errors.password}
                />

                <View style={{marginVertical: 10}}/>
                <ShareButton
                    loading={loading}
                    title= "Đăng nhập"
                    onPress= {handleSubmit as any}
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
                )}
            </Formik>

        </SafeAreaView>
    )
}

export default Login;