import { useCurrentApp } from "@/context/app.context";
import {
  currencyFormatter,
  getOrderHistoryAPI,
  getURLBaseBackend,
} from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const OrderPage = () => {
  const [orderHistory, setOrderHistory] = useState<IOrderHistory[]>([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      const res = await getOrderHistoryAPI();
      if (res.data) {
        if (Array.isArray(res.data)) {
          setOrderHistory(res.data);
        } else if (res.data.result && Array.isArray(res.data.result)) {
          setOrderHistory(res.data.result);
        }
      }
    };
    fetchOrderHistory();
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
            Lịch sử đơn hàng
          </Text>
        </View>
        <ScrollView style={{ flex: 1 }}>
          {orderHistory?.map((item, index) => {
            return (
              <View key={index}>
                <View
                  style={{
                    padding: 10,
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <Image
                    style={{ height: 100, width: 100 }}
                    source={{
                      uri: `${getURLBaseBackend()}/images/restaurant/${item.restaurant?.image}`,
                    }}
                  />
                  <View style={{ gap: 10 }}>
                    <Text>{item.restaurant?.name}</Text>
                    <Text>{item.restaurant?.address}</Text>
                    <Text>{currencyFormatter(item.totalPrice)}</Text>
                    <Text>Trạng thái: {item.status}</Text>
                  </View>
                </View>
                <View style={{ height: 10, backgroundColor: "#eee" }} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default OrderPage;
