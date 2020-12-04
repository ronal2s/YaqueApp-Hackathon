import React from "react";
import { ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import Modal from "./modal";
import { COLORS } from "../utils/enums";
const color_success = "#00b894";
const color_failure = "#e74c3c"
const icon_success = "check-circle"
const icon_failure = "alert-circle"
const iconColor_success = "white"
const iconColor_failure = "white"
type LoadingProps = {
    open: boolean,
}

function Loading(props: LoadingProps) {
    const bgcolor = props.success ? color_success : color_failure
    const iconcolor = props.success ? iconColor_success : iconColor_failure
    const icon = props.success ? icon_success : icon_failure
    return (
        <Modal open={props.open} onClose={() => console.log("Triying to close Modal Loading")} color={COLORS.PRIMARY} title={"Por favor espere"} titleColor="white" animationIn="fadeIn" >
            <View style={{justifyContent: "center", alignItems: "center"}} >
                <ActivityIndicator color="white" size={38} />
            </View>
        </Modal>
    )
}

export default Loading;