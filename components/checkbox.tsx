import React from "react";
import { CheckBox } from "react-native-elements";
const COLOR_CLEAR = "rgba(0,0,0,0)"

type CheckboxProps = {
    onPress?: (name?: string) => void,
    title: string,
    name?: string,
    checked?: boolean,
}


function CustomCheckbox(props: CheckboxProps) {
    return (
        <CheckBox title={props.title} checked={props.checked} containerStyle={{ backgroundColor: COLOR_CLEAR, borderColor: COLOR_CLEAR }} onPress={() => props.onPress(props.name)} />
    )
}

export default CustomCheckbox;