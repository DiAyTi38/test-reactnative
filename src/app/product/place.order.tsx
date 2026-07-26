import HeaderHome from "@/components/home/header.home";
import { useCurrentApp } from "@/context/app.context";
import {
  currencyFormatter,
  getURLBaseBackend,
  placeOrderAPI,
} from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-root-toast";

interface IOrderItem {
  image: string;
  title: string;
  option: string;
  price: number;
  quantity: number;
}

const OrderPage = () => {
  const { restaurant, cart, setCart } = useCurrentApp();
  const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);

  useEffect(() => {
    if (cart && restaurant && restaurant._id) {
      const result = [];
      for (const [menuItemId, currentItems] of Object.entries(
        cart[restaurant._id].items,
      )) {
        if (currentItems.extra) {
          for (const [key, value] of Object.entries(currentItems.extra)) {
            const option = currentItems.data.options?.find(
              (item) => `${item.title}-${item.description}` === key,
            );
            const addPrice = option?.additionalPrice ?? 0;

            result.push({
              image: currentItems.data.image,
              title: currentItems.data.title,
              option: key,
              price: currentItems.data.basePrice + addPrice,
              quantity: value,
            });
          }
        } else {
          result.push({
            image: currentItems.data.image,
            title: currentItems.data.title,
            option: "",
            price: currentItems.data.basePrice,
            quantity: currentItems.quantity,
          });
        }

        setOrderItems(result);
      }
    }
  }, [restaurant]);

  const handlePlaceOrder = async () => {
    const data = {
      restaurant: restaurant?._id,
      totalPrice: cart?.[restaurant!._id].sum,
      totalQuantity: cart?.[restaurant!._id].quantity,
      detail: orderItems,
    };

    const res = await placeOrderAPI(data);
    if (res.data) {
      //success
      Toast.show("Đặt hàng thành công", {
        duration: Toast.durations.LONG,
        textColor: "white",
        backgroundColor: APP_COLOR.ORANGE,
        opacity: 1,
      });
      // clear data cart
      if (restaurant) {
        delete cart[restaurant._id];
        setCart((prevCart: any) => ({ ...prevCart, ...cart }));
      }
      router.navigate("/");
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
    <View style={{ flex: 1 }}>
      <View
        style={{
          borderBottomColor: "#eee",
          borderBottomWidth: 1,
          padding: 10,
        }}
      >
        <HeaderHome />
      </View>
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontWeight: "600",
          }}
        >
          {restaurant?.name}
        </Text>
      </View>

      <ScrollView style={{ padding: 10, flex: 1 }}>
        {orderItems?.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                gap: 10,
                flexDirection: "row",
                borderBottomColor: "#eee",
                borderBottomWidth: 1,
                paddingVertical: 10,
              }}
            >
              <Image
                style={{ height: 50, width: 50 }}
                source={{
                  uri: `${getURLBaseBackend()}/images/menu-item/${item.image}`,
                }}
              />
              <View>
                <Text style={{ fontWeight: "600" }}>{item.quantity} x </Text>
              </View>
              <View style={{ gap: 10 }}>
                <Text>{item.title}</Text>
                <Text style={{ fontSize: 12, color: APP_COLOR.GREY }}></Text>
              </View>
            </View>
          );
        })}
        {orderItems?.length > 0 && (
          <View style={{ marginVertical: 15 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: APP_COLOR.GREY }}>
                Tổng cộng (
                {restaurant &&
                  cart?.[restaurant!._id] &&
                  cart?.[restaurant!._id].quantity}{" "}
                món)
              </Text>

              <Text>
                {currencyFormatter(
                  restaurant &&
                    cart?.[restaurant!._id] &&
                    cart?.[restaurant!._id].sum,
                )}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
      <View
        style={{
          gap: 20,
          marginBottom: 15,
          padding: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
            width: "100%",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              height: 45,
              borderWidth: 1,
              borderColor: APP_COLOR.GREY,
              borderRadius: 4,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 5,
              backgroundColor: "#fff",
            }}
            onPress={() => alert("Ví PayPal")}
          >
            <Text style={{ color: APP_COLOR.GREY }}>Ví PayPal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              height: 45,
              borderWidth: 1,
              borderColor: APP_COLOR.ORANGE,
              borderRadius: 4,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 5,
              backgroundColor: "#fff",
            }}
            onPress={() => alert("Tiền mặt")}
          >
            <Text style={{ color: APP_COLOR.ORANGE }}>Tiền mặt</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Pressable
            onPress={handlePlaceOrder}
            style={({ pressed }) => ({
              opacity: pressed === true ? 0.5 : 1,
              padding: 10,
              backgroundColor: APP_COLOR.ORANGE,
              borderRadius: 3,
            })}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
              }}
            >
              Đặt đơn - {``}
              {currencyFormatter(
                cart &&
                  restaurant &&
                  cart?.[restaurant!._id] &&
                  cart?.[restaurant!._id].sum,
              )}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default OrderPage;
