import React from "react";
import { Input } from "react-native-elements";
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

import { ReturnKeyTypeOptions, KeyboardTypeOptions, StyleProp, ViewStyle, View, TouchableOpacity } from "react-native";
import globalStyles from "../styles";

type InputProps = {
    placeholder?: string,
    label?: string,
    readonly?: boolean,
    labelStyle?: object,
    returnKeyType?: ReturnKeyTypeOptions,
    name: string,
    password?: boolean,
    value?: string | number,
    errorMessage?: string,
    rounded?: boolean
    square?: boolean,
    leftIcon?: string,
    rightIcon?: string,
    rightIconPress?: () => void,
    leftIconPress?: () => void,
    iconColor?: string,
    iconSize?: number,
    iconType?: string,
    keyboardType?: KeyboardTypeOptions,
    textArea?: boolean,
    blurOnSubmit?: boolean,
    maxLength?: number,
    numberOfLines?: number,
    width?: number,
    marginBottom?: number,
    inputContainerStyle?: StyleProp<ViewStyle>,
    rightIconContainerStyle?: StyleProp<ViewStyle>
    // setRef?: React.MutableRefObject<any>
    setRef?: (nameInput: string, ref: any) => void,
    onSubmitEditing?: () => void,
    onChangeText?: (name: string, text: string) => void,
    height?: number,
}

function CustomInput(props: InputProps) {

    const Icon = () => {
        if (props.iconType === "font-awesome") {
            return (
                <FontAwesome5 name={props.rightIcon? props.rightIcon: props.leftIcon} size={props.iconSize ? props.iconSize : 24} color={props.iconColor ? props.iconColor : "#A9A9A9"} />
            )
        }

        return <MaterialCommunityIcons name={props.rightIcon? props.rightIcon: props.leftIcon} size={props.iconSize ? props.iconSize : 24} color={props.iconColor ? props.iconColor : "#A9A9A9"} />
    }

    return (
        <View style={{ width: props.width }} >
            <Input placeholder={props.placeholder} blurOnSubmit={props.blurOnSubmit} disabled={props.readonly} value={props.value ? props.value.toString() : ""} label={props.label} 
            labelStyle={props.labelStyle} secureTextEntry={props.password}
                returnKeyType={props.returnKeyType} onSubmitEditing={props.onSubmitEditing} onChangeText={(text) => props.onChangeText(props.name, text)}
                ref={(ref) => props.setRef ? props.setRef(props.name, ref) : false} errorMessage={props.errorMessage}
                // leftIcon={props.leftIcon ? { type: 'material-community', name: props.leftIcon, color: props.iconColor ? props.iconColor : "#A9A9A9" } : undefined}
                keyboardType={props.keyboardType} numberOfLines={props.textArea ? 3 : 1} multiline={props.textArea} inputContainerStyle={[props.rounded ? [globalStyles.inputRounded, globalStyles.shadow] : props.square ? [globalStyles.inputSquare, globalStyles.shadow] : props.inputContainerStyle, props.textArea ? { height: 100, alignItems: "baseline", flexDirection: "row" } : { height: props.height ? props.height : undefined }]}
                leftIcon={<TouchableOpacity onPress={props.leftIconPress} ><Icon /></TouchableOpacity>}
                // rightIcon={<TouchableOpacity onPress={props.rightIconPress} ><Icon /></TouchableOpacity>}
                rightIconContainerStyle={props.rightIconContainerStyle} containerStyle={{ marginBottom: props.marginBottom ? props.marginBottom : 10 }} maxLength={props.maxLength}
            />
        </View>

    )
}


export default CustomInput;