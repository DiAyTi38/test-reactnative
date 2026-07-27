import { updateUserPasswordAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { UpdateUserPasswordSchema } from "@/utils/validate.schema";
import { Formik, FormikProps } from "formik";
import { useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Toast from "react-native-root-toast";
import ShareInput from "../input/share.input";

const UserPassword = () => {
  const formikRef = useRef<FormikProps<any>>(null);
  const handleUpdatePassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    const res = await updateUserPasswordAPI(currentPassword, newPassword);
    if (res.data) {
      Toast.show("Cập nhật mật khẩu thành công!", {
        duration: Toast.durations.LONG,
        textColor: "white",
        backgroundColor: APP_COLOR.ORANGE,
        opacity: 1,
      });

      formikRef?.current?.resetForm();
    } else {
      const m = Array.isArray(res.message) ? res.message[0] : res.message;
      Toast.show(m, {
        duration: Toast.durations.LONG,
        textColor: "white",
        backgroundColor: APP_COLOR.ORANGE,
        opacity: 1,
      });
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 10,
            paddingTop: 20,
          }}
        >
          <Formik
            innerRef={formikRef}
            validationSchema={UpdateUserPasswordSchema}
            initialValues={{
              currentPassword: "",
              newPassword: "",
              confirmNewPassword: "",
            }}
            onSubmit={(values) =>
              handleUpdatePassword(
                values?.currentPassword ?? "",
                values?.newPassword ?? "",
              )
            }
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
              dirty,
            }) => (
              <View style={{ marginTop: 20, gap: 20 }}>
                <ShareInput
                  title="Mật khẩu hiện tại"
                  onChangeText={handleChange("currentPassword")}
                  onBlur={handleBlur("currentPassword")}
                  secureTextEntry={true}
                  value={values.currentPassword}
                  errors={errors.currentPassword}
                  touched={touched.currentPassword}
                />
                <ShareInput
                  title="Mật khẩu mới"
                  onChangeText={handleChange("newPassword")}
                  onBlur={handleBlur("newPassword")}
                  secureTextEntry={true}
                  value={values.newPassword}
                  errors={errors.newPassword}
                  touched={touched.newPassword}
                />
                <ShareInput
                  title="Xác nhận mật khẩu mới"
                  onChangeText={handleChange("confirmNewPassword")}
                  onBlur={handleBlur("confirmNewPassword")}
                  secureTextEntry={true}
                  value={values.confirmNewPassword}
                  errors={errors.confirmNewPassword}
                  touched={touched.confirmNewPassword}
                />

                <Pressable
                  disabled={!(isValid && dirty)}
                  onPress={handleSubmit as any}
                  style={({ pressed }) => ({
                    opacity: pressed === true ? 0.5 : 1,
                    backgroundColor:
                      isValid && dirty ? APP_COLOR.ORANGE : APP_COLOR.GREY,
                    padding: 10,
                    marginTop: 10,
                    borderRadius: 3,
                  })}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: isValid && dirty ? "white" : "grey",
                    }}
                  >
                    Lưu thay đổi
                  </Text>
                </Pressable>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UserPassword;
