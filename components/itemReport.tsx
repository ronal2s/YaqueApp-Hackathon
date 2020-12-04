import React from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { Avatar, Icon, ListItem } from "react-native-elements";
import { View } from "../styles/emotions";
import { COLORS, SIZE } from "../utils/enums";

interface IItemReport {
    title: string,
    post_title?: string,
    subtitle?: string,
    sub_subtitle?: string,
    onPrint?: () => void,
    onBan?: () => void,
    type?: "depositos" | "detallados" | "facturasPendientes",
    loading?: boolean,

}

function ItemReport(props: IItemReport) {
    console.log("isLoading?: ", props.loading)
    if (props.type === "depositos") {
        return <ListItem bottomDivider >
            <Avatar rounded icon={{ type: "font-awesome", name: "dollar", color: "white", size: 24 }} size="medium" containerStyle={{ backgroundColor: COLORS.CASH }} />
            <ListItem.Content>
                <ListItem.Title>
                    <ListItem.Title style={{ color: COLORS.PRIMARY }} >{props.title}</ListItem.Title>
                </ListItem.Title>
                <ListItem.Subtitle style={{ fontStyle: "italic" }} >{props.sub_subtitle}</ListItem.Subtitle>
            </ListItem.Content>
            <View flexDirection="row" justifyContent="space-between" width={60} >
                <ListItem.Subtitle style={{ color: COLORS.CASH, fontWeight: "bold", fontSize: 20 }} >{props.subtitle}</ListItem.Subtitle>
            </View>
        </ListItem>
    }
    if (props.type == "facturasPendientes") {
        return <ListItem bottomDivider >
            <Avatar rounded icon={{ type: "font-awesome", name: "file", color: "white", size: 24 }} size="medium" containerStyle={{ backgroundColor: COLORS.PRIMARY }} />
            <ListItem.Content>
                <ListItem.Title>
                    <ListItem.Title style={{ color: COLORS.PRIMARY }} >{props.title}</ListItem.Title>
                </ListItem.Title>
                <ListItem.Subtitle style={{ fontStyle: "italic" }} >{props.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
            <View flexDirection="row" justifyContent="space-between" width={60} >
                <ListItem.Subtitle style={{ fontStyle: "italic" }} >{props.sub_subtitle}</ListItem.Subtitle>
            </View>
        </ListItem>
    }
    return (
        <View>
            <ListItem bottomDivider >
                <Avatar rounded icon={{ type: "font-awesome", name: "file", color: "white", size: 24 }} size="medium" containerStyle={{ backgroundColor: COLORS.PRIMARY }} />
                <ListItem.Content>
                    <ListItem.Title>
                        <ListItem.Title style={{ color: COLORS.PRIMARY }} >{props.title}</ListItem.Title>
                        <ListItem.Title style={{ color: COLORS.GRAY }} > {props.post_title}</ListItem.Title>
                    </ListItem.Title>
                    <ListItem.Subtitle>{props.subtitle}</ListItem.Subtitle>
                    <ListItem.Subtitle style={{ fontStyle: "italic" }} >{props.sub_subtitle}</ListItem.Subtitle>
                </ListItem.Content>
                {props.loading ? <ActivityIndicator size={SIZE.SpinnerInfo} color={COLORS.PRIMARY} /> :
                    <View flexDirection="row" justifyContent="space-between" width={60} >
                        <TouchableOpacity onPress={props.onPrint} >
                            <Icon type="font-awesome" name="print" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={props.onBan} >
                            <Icon type="font-awesome" name="ban" />
                        </TouchableOpacity>
                    </View>
                }
            </ListItem>
        </View>
    )
}

export default ItemReport;