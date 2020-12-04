import React from "react";
import { View } from "react-native";

interface iSeparator {
    size?: number
}
function Separator(props: iSeparator) {
    return (
        <View style={{ marginVertical: props.size ? props.size : 10 }} />
    )
}

export default Separator;