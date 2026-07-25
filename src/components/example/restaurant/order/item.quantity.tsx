import { currencyFormatter, getURLBaseBackend } from '@/utils/api';
import { APP_COLOR } from '@/utils/constant';
import { View, Text, Image } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';

interface IProps {
    menuItem: IMenuItem;
}

const ItemQuantity = (props: IProps) => {
    const {menuItem} = props;
    
    return (
        <View style={{
            backgroundColor: "white",
            gap: 10, flexDirection: "row", padding: 10
        }}>
            <View>
                <Image
                    style={{height: 100, width: 100}}
                    source={{uri: `${getURLBaseBackend()}/images/menu-item/${menuItem?.image}`}}
                />
            </View>
            <View style={{ flex: 1, gap: 10}}>
                <View><Text>{menuItem.title}</Text></View>
                <View><Text>{menuItem.description}</Text></View>
                <View style={{justifyContent: 'space-between', flexDirection: "row"}}>
                    <Text style={{color: APP_COLOR.ORANGE}}>
                        {currencyFormatter(menuItem.basePrice)}
                    </Text>
                    <View style={{alignItems: "center",flexDirection: "row", gap: 3}}>
                        <Feather name="minus-square" size={24} color= {APP_COLOR.ORANGE} />
                        <Text style={{minWidth: 25, textAlign: "center"}}>10</Text>
                        <Entypo name="squared-plus" size={24} color= {APP_COLOR.ORANGE}/>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ItemQuantity;