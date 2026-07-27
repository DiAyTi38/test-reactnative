import { router } from "expo-router";
import { useEffect, useState } from "react";
import { getAccountAPI } from "@/utils/api";
import { useCurrentApp } from "@/context/app.context";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { APP_FONT } from "@/utils/constant";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const RootPage = () => {
  const { setAppState } = useCurrentApp();
  const [state, setState] = useState<any>();
  const [loaded, error] = useFonts({
    [APP_FONT]: require("@/assets/font/OpenSans-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // do something async here
        const res = await getAccountAPI();
        if (res.data) {
          // success
          setAppState({
            user: res.data.user,
          });
          router.replace("/(tabs)");
        } else {
          // errors
          router.replace("/(auth)/welcome");
        }
      } catch (e) {
        setState(() => {
          throw Error("Không thể kết nối tới API Backend...");
        });
        // console.log("Không thể kết nối tới API Backend...");
        // console.warn(e);
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
  return <></>;
};

export default RootPage;
