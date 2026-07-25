import { APP_COLOR } from "@/utils/constant";
import { Pressable, Text, View } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { currencyFormatter } from "@/utils/api";
import { useCurrentApp } from "@/context/app.context";

interface IProps {
    restaurant: IRestaurant | null;
}
const StickyFooter = (props: IProps) => {
    const {cart, setCart} = useCurrentApp();
    const {restaurant} = props;

    const getSum = () => {
        if (restaurant && cart[restaurant._id]) {
            return cart[restaurant._id].sum;
        }
        return 0;
    }
    return (
        <>
        {getSum() === 0 ? <></> :
            <View style = {{
            width: "100%",
            backgroundColor: "white",
            zIndex: 11,
            position: "absolute",
            bottom: 0,
            flexDirection: "row"
        }}>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flex: 1,
                borderTopWidth: 1,
                backgroundColor: APP_COLOR.GREY,
            }}>
                <View style={{padding: 10}}>
                    <View style={{
                        position: "absolute",
                        left: 40,
                        top: 5,
                        width: 16,
                        height: 16,
                        borderRadius: 16/2,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: APP_COLOR.ORANGE
                    }}>
                        <Text style={{color: "white", fontSize: 9,}}>
                            {restaurant && cart && cart[restaurant?._id] && 
                            cart[restaurant?._id]["quantity"] && 
                                <Text>
                                    {cart[restaurant?._id]["quantity"]}
                                </Text>
                            }
                        </Text>
                    </View>
                    <Pressable onPress={() => alert("cart")}>
                        <FontAwesome6 name="basket-shopping" size={24} color={APP_COLOR.ORANGE} />
                    </Pressable>
                </View>
                <View style={{paddingRight: 10}}>
                    <Text style={{color: APP_COLOR.ORANGE, fontSize: 18}}> {currencyFormatter(getSum())}</Text>
                </View>
            </View>

            <View style={{
                width: 100,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: APP_COLOR.ORANGE
            }}>
                <Text style={{ color: "white"}}
                    onPress={() => alert("giao hàng")}
                >
                   Giao hàng 
                </Text>
            </View>
            </View>
        }
        </>
    )
}

export default StickyFooter;