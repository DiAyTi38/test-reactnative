import { Link, router } from "expo-router";
import { Button, Text, View } from "react-native"

const AppRoot = () => {
    
    const handleLogin = () => {
        alert ("Login")
        //router.navigate("/login")
        router.navigate("/user")
    }
    return (
        <View>
            <Text>1 Hello world with expo router</Text>
            <Link href={"/hoidanit"}>Go to hoidanit</Link>
            <Link href={"/like"}>Go to like</Link>

            <Link href={"/like/like.detail"} asChild>
                <Button title= "Go to like detail"/>
            </Link>

            <View style={{margin: 20}}>
                <Button title="Login" onPress={handleLogin}/>
            </View>
        </View>
    )
}

export default AppRoot;