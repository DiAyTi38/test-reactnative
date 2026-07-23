import { APP_COLOR } from "@/utils/constant";
import { StyleSheet, Text, View } from "react-native";
import OTPTextView from "react-native-otp-textinput";

const styles = StyleSheet.create({
    container: {
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 25,
        fontWeight: "600",
        marginVertical: 20
    },
})

const VertifyPage = () => {
    return (
        <View style = {styles.container}>
            <Text style={styles.heading}> Xác thực tài khoản</Text>
            <Text style={{marginVertical: 10}}>Vui lòng nhập mã xác nhận đã được gửi tới
                địa chỉ trandat38052005@gmail.com</Text>
            <View style={{marginVertical: 20}}>
                <OTPTextView
                    inputCount={6}
                    inputCellLength={1}
                    tintColor={APP_COLOR.ORANGE}
                    textInputStyle={{
                        borderWidth: 1,
                        borderColor: APP_COLOR.GREY,
                        borderBottomWidth: 1,
                        borderRadius: 5,
                        // @ts-ignore:next-line
                        color: APP_COLOR.ORANGE
                    }}
                />
            </View>
            <View style={{flexDirection: "row", marginVertical: 10}}>
                <Text>không nhận được mã xác nhận,</Text>
                <Text style={{textDecorationLine: 'underline'}}> gửi lại</Text>
            </View>
        </View>
    )
}

export default VertifyPage;