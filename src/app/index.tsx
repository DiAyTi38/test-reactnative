import { Link } from "expo-router";
import { Text, View } from "react-native"

const AppRoot = () => {
    return (
        <View>
            <Text>1 Hello world with expo router</Text>
            <Link href="/hoidanit">Go to hoidanit</Link>
            <Link href="/like">Go to like</Link>
        </View>
    )
}

export default AppRoot;