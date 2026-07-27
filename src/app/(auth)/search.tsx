import { getRestaurantByName, getURLBaseBackend } from "@/utils/api";
import debounce from "debounce";
import { useState } from "react";
import {
  Image,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { APP_COLOR } from "@/utils/constant";
import { SafeAreaView } from "react-native-safe-area-context";

const data = [
  {
    key: 1,
    name: "Quán Tiền Bối",
    source: require("@/assets/icons/Notif.png"),
  },
  {
    key: 2,
    name: "Bún, Mì, Phở",
    source: require("@/assets/icons/bun-pho.png"),
  },
  { key: 3, name: "Fast Food", source: require("@/assets/icons/fastfood.png") },
  { key: 4, name: "Pizza", source: require("@/assets/icons/Pizza.png") },
  { key: 5, name: "Burger", source: require("@/assets/icons/burger.png") },
  { key: 6, name: "Sống Khoẻ", source: require("@/assets/icons/elipse.png") },
  {
    key: 7,
    name: "Giảm 50k",
    source: require("@/assets/icons/flash-deals.png"),
  },
  { key: 8, name: "Milk Tea", source: require("@/assets/icons/test.png") },
];

const SearchPage = () => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleSearch = debounce(async (text: string) => {
    setSearchTerm(text);
    if (!text) return;

    const res = await getRestaurantByName(text);
    if (res.data) {
      setRestaurants(res.data.results);
    }
  }, 300);

  const DefaultResult = () => {
    return (
      <View
        style={{
          backgroundColor: "white",
          padding: 10,
          gap: 10,
        }}
      >
        <Text>Phổ biến</Text>
        <FlatList
          data={data}
          numColumns={2}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 10,
                  flex: 1,
                  borderColor: "#eee",
                  borderTopWidth: index === 0 || index === 1 ? 1 : 0,
                  borderBottomWidth: 1,
                  borderLeftWidth: 1,
                  borderRightWidth: index % 2 === 1 ? 1 : 0,
                }}
              >
                <Text>{item.name}</Text>
                <Image source={item.source} style={{ width: 40, height: 40 }} />
              </View>
            );
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
          padding: 10,
        }}
      >
        <MaterialIcons
          onPress={() => router.back()}
          name="keyboard-arrow-left"
          size={24}
          color={APP_COLOR.ORANGE}
        />
        <TextInput
          placeholder="Tìm kiếm cửa hàng..."
          onChangeText={(text: string) => handleSearch(text)}
          style={{ flex: 1 }}
        />
      </View>
      {searchTerm ? (
        <ScrollView style={{ flex: 1 }}>
          {restaurants.map((item, index) => {
            return (
              <View key={index}>
                <Pressable
                  onPress={() =>
                    router.navigate({
                      pathname: "/product/[id]",
                      params: { id: item._id },
                    })
                  }
                  style={{
                    padding: 10,
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <Image
                    style={{ height: 100, width: 100 }}
                    source={{
                      uri: `${getURLBaseBackend()}/images/restaurant/${item.image}`,
                    }}
                  />
                  <View style={{ gap: 10, flex: 1 }}>
                    <Text style={{ fontWeight: "600", fontSize: 16 }}>
                      {item.name}
                    </Text>
                    <Text>{item.phone}</Text>
                    <Text>{item.address}</Text>
                  </View>
                </Pressable>
                <View style={{ height: 10, backgroundColor: "#eee" }} />
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <DefaultResult />
      )}
    </SafeAreaView>
  );
};

export default SearchPage;
