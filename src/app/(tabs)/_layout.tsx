import { APP_COLOR } from "@/utils/constant";
import { Tabs } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

const TabLayout = () => {
    const getIcons = (routeName: string, focused: boolean, size: number) => {
        if (routeName === "index") {
            return (
                <MaterialCommunityIcons
                    name="food-fork-drink"
                    size = {size}
                    color = {focused ? APP_COLOR.ORANGE: APP_COLOR.GREY}
                />)
        }

        if (routeName === "order") {
            return (
                <FontAwesome name="list-alt" size={24} color = {focused ? APP_COLOR.ORANGE: APP_COLOR.GREY} />)
        }

        if (routeName === "favorite") {
            return ( focused ?
                <AntDesign name="heart" size={24} color={APP_COLOR.ORANGE} /> 
                : <FontAwesome name="heart-o" size={24} color={APP_COLOR.GREY} />)
        }

        if (routeName === "notification") {
            return (
                <FontAwesome name="bell" size={24} color = {focused ? APP_COLOR.ORANGE: APP_COLOR.GREY} />)
        }

        if (routeName === "account") {
            return (
                <MaterialCommunityIcons name="account" size={24} color = {focused ? APP_COLOR.ORANGE: APP_COLOR.GREY} />)
        }

        return (<></>)     
    }
    
    return (
        <Tabs
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                return getIcons(route.name, focused, size);
              },
              headerShown: false,
              tabBarLabelStyle: {paddingBottom: 3},
              tabBarInactiveTintColor: APP_COLOR.ORANGE,
            })}
        >
          <Tabs.Screen 
            name="index" 
            options={{
            title: "Home"
          }}/>
          <Tabs.Screen 
            name="order" 
            options={{
            title: "Đơn hàng"
          }}/>
          <Tabs.Screen 
            name="favorite" 
            options={{
            title: "Đã thích"
          }}/>
          <Tabs.Screen 
            name="notification" 
            options={{
            title: "Thông báo"
          }}/>
          <Tabs.Screen 
            name="account" 
            options={{
            title: "Tôi"
          }}/>
        </Tabs>
    ) 
}

export default TabLayout;