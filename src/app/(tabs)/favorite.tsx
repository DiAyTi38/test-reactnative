import {
  currencyFormatter,
  getFavoriteRestaurantAPI,
  getURLBaseBackend,
} from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const FavoritePage = () => {
  const [favoriteRestaurant, setFavoriteRestaurant] = useState<IRestaurant[]>(
    [],
  );

  useEffect(() => {
    const fetchRestaurants = async () => {
      const res = await getFavoriteRestaurantAPI();
      if (res.data) {
        setFavoriteRestaurant(res.data);
      }
    };
    fetchRestaurants();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            borderBottomColor: "#eee",
            borderBottomWidth: 1,
            paddingHorizontal: 10,
            paddingBottom: 5,
          }}
        >
          <Text
            style={{
              color: APP_COLOR.ORANGE,
            }}
          >
            Quán ăn ưa thích
          </Text>
        </View>
        <ScrollView style={{ flex: 1 }}>
          {favoriteRestaurant?.map((item, index) => {
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
      </View>
    </SafeAreaView>
  );
};

export default FavoritePage;
