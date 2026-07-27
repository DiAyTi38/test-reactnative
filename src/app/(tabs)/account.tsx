import { useCurrentApp } from "@/context/app.context";
import { getURLBaseBackend } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import {
  Alert,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountPage = () => {
  const insets = useSafeAreaInsets();
  const { appState } = useCurrentApp();
  const baseImage = `${getURLBaseBackend()}/images/avatar`;

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Xác nhận đăng xuất người dùng?", [
      { text: "Huỷ", style: "cancel" },
      {
        text: "OK",
        onPress: async () => {
          await AsyncStorage.removeItem("access-token");
          router.replace("/(auth)/welcome");
        },
      },
    ]);
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          gap: 20,
          flexDirection: "row",
          paddingTop: insets.top,
          paddingHorizontal: 20,
          paddingBottom: 20,
          backgroundColor: APP_COLOR.ORANGE,
          alignItems: "center",
        }}
      >
        <Image
          style={{ height: 60, width: 60 }}
          source={{ uri: `${baseImage}/${appState?.user.avatar}` }}
        />
        <View>
          <Text style={{ color: "white", fontSize: 20 }}>
            {appState?.user.name}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={() => router.navigate("/(user)/account/info")}
        style={{
          flexDirection: "row",
          paddingVertical: 15,
          gap: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#eee",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <MaterialIcons name="manage-accounts" size={24} color="green" />
          <Text>Cập nhật thông tin</Text>
        </View>
        <MaterialIcons name="navigate-next" size={24} color={APP_COLOR.GREY} />
      </Pressable>

      <Pressable
        onPress={() => router.navigate("/(user)/account/password")}
        style={{
          flexDirection: "row",
          paddingVertical: 15,
          gap: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#eee",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <MaterialIcons name="password" size={24} color="green" />
          <Text>Thay đổi mật khẩu</Text>
        </View>
        <MaterialIcons name="navigate-next" size={24} color={APP_COLOR.GREY} />
      </Pressable>

      <Pressable
        style={{
          flexDirection: "row",
          paddingVertical: 15,
          gap: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#eee",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <MaterialIcons name="language" size={24} color="green" />
          <Text>Ngôn ngữ</Text>
        </View>
        <MaterialIcons name="navigate-next" size={24} color={APP_COLOR.GREY} />
      </Pressable>

      <Pressable
        style={{
          flexDirection: "row",
          paddingVertical: 15,
          gap: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#eee",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <MaterialIcons name="info-outline" size={24} color="green" />
          <Text>Ngôn ngữ</Text>
        </View>
        <MaterialIcons name="navigate-next" size={24} color={APP_COLOR.GREY} />
      </Pressable>

      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          paddingBottom: 15,
          gap: 10,
        }}
      >
        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => ({
            opacity: pressed === true ? 0.5 : 1,
            padding: 10,
            marginHorizontal: 10,
            backgroundColor: APP_COLOR.ORANGE,
            borderRadius: 3,
          })}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
            }}
          >
            Đăng xuất
          </Text>
        </Pressable>

        <Text
          style={{
            textAlign: "center",
            color: APP_COLOR.GREY,
          }}
        >
          Version 1.0 - @DiAyTi
        </Text>
      </View>
    </View>
  );
};

export default AccountPage;
