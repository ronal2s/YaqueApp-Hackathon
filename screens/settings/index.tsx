import React, { useContext } from "react";
import { View } from "react-native";
import { GlobalContext } from "../../contexts/globalContexts";
import { Avatar, ListItem } from "react-native-elements";
import { COLORS } from "../../utils/enums";

function Settings(props) {
    const globalContexts = useContext(GlobalContext);

    const logOut = () => {
        globalContexts.setContext({ user: { ...globalContexts.user, logged: false } })
    }

    return (
        <View >
            <View>
                <ItemList title="Ajustes #1" />
                <ItemList title="Ajustes #2" />
                <ItemList title="Cerrar sesión" onPress={logOut} />
                {/* <ListItem >
                    <Avatar title="A" rounded containerStyle={{ backgroundColor: COLORS.GRAY }} />
                    <ListItem.Content>
                        <ListItem.Title>Ajustes #1</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem> */}
                {/* <ListItem title="Ajustes #1" chevron leftAvatar={{ title: "A1" }} bottomDivider />
                <ListItem title="Ajustes #2" chevron leftAvatar={{ title: "A2" }} bottomDivider />
                <ListItem title="Ajustes #3" chevron leftAvatar={{ title: "A3" }} bottomDivider />
                <ListItem title="Cerrar sesión" chevron leftAvatar={{ title: "C" }} bottomDivider onPress={logOut} /> */}
            </View>
        </View>
    )
}

interface IItemList {
    title: string,
    onPress?: () => void,
}

const ItemList = (props: IItemList) => {
    return (
        <ListItem bottomDivider >
            <Avatar title={props.title[0] + props.title[props.title.length - 1]} rounded containerStyle={{ backgroundColor: COLORS.GRAY }} />
            <ListItem.Content>
                <ListItem.Title>{props.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    )
}

export default Settings;