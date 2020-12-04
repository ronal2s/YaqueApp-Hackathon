import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "./modal";
const color_success = "#00b894";
const color_failure = "#e74c3c"
const icon_success = "check-circle"
const icon_failure = "alert-circle"
const iconColor_success = "white"
const iconColor_failure = "white"
type AlertProps = {
    open: boolean,
    title: string,
    content: string,
    success?: boolean,
    onClose: () => void,
}

function Alert(props: AlertProps) {
    const bgcolor = props.success ? color_success : color_failure
    const iconcolor = props.success ? iconColor_success : iconColor_failure
    const icon = props.success ? icon_success : icon_failure
    return (
        <Modal open={props.open} onClose={props.onClose} color={bgcolor} titleIcon={icon} titleIconColor={iconcolor} title={props.title} titleColor="white" animationIn={!props.success ? "tada" : "shake"} animationOut="pulse" >
            <ScrollView>
                <Text style={{ textAlign: "center", fontSize: 16, color: "white" }} >{props.content}</Text>
                <View style={{justifyContent: "center", alignItems: "center"}} >
                    <TouchableOpacity onPress={props.onClose}
                    style={{backgroundColor: "white", padding: 10, width: "100%", marginHorizontal: 10, alignItems: "center", marginTop: 10}} >
                        <Text style={{color: bgcolor, fontWeight: "bold", fontSize: 16}} >Aceptar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Modal>
    )
}

export default Alert;