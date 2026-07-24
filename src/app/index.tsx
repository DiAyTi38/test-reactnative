import { router } from "expo-router";
import { useEffect } from "react";
import { getAccountAPI } from "@/utils/api";
import { useCurrentApp } from "@/context/app.context";
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const RootPage = () => {

    const {setAppState} = useCurrentApp();

    useEffect(() => {
        async function prepare() {
          try {
            // do something async here
            const res = await getAccountAPI();
            if (res.data) {
                // success
                setAppState({
                    user: res.data.user,
                })
                router.replace("/(tabs)")
            } else {
                // errors
                router.replace("/(auth)/welcome")
            }
          } catch (e) {
            console.warn(e);
          } finally {
            await SplashScreen.hideAsync();
          }
        } 
        prepare();
    }, []);

    // if (true) {
    //     return (
    //         <Redirect href={"/(tabs)/"}/>
    //     )
    // }
    return (
        <>

        </>
    )
}

export default RootPage;