import React from "react";
import { View, Text } from "react-native";
import globalStyles from "../styles";

type ViewProps = {
    children: React.ReactNode,
    title?: string,
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly',
    viewWidth?: string,
    paddingHorizontal?: number,
}


function ViewRows(props: ViewProps) {
    return (
        <>
            <View style={{ flexDirection: "row", width: props.viewWidth ? props.viewWidth : "100%", justifyContent: props.justifyContent ? props.justifyContent : "space-between", paddingHorizontal: props.paddingHorizontal }} >
                {props.children}
            </View>
        </>
    )
}

export default ViewRows;