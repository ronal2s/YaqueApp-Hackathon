import React, { useState } from "react";
import { ReturnKeyTypeOptions, KeyboardTypeOptions, Picker, Text, View, TouchableOpacity, ScrollView } from "react-native";
import globalStyles from "../styles";
import { Icon } from "react-native-elements";
import CustomModal from "./modal";
import { COLORS } from "../utils/enums";

type PickerProps = {
    selectedValue: string | number,
    name: string,
    label?: string,
    rounded?: boolean,
    square?: boolean,
    // areObjects?: boolean,
    objectLabel?: string,
    onValueChange: (name, value) => void,
    items: string[] | {}[] | [],
    width?: number,
    height?: number,
    placeholer?: string,
    marginTop?: number,
    marginHorizonta?: number,
    borderColor?: string,
    textColor?: string,
    animation?: boolean,
}

function CustomPicker(props: PickerProps) {
    const fixedItems = props.objectLabel ? props.items.map((value) => value[props.objectLabel]) : props.items;
    const [modal, setModal] = useState(false);
    let auxValue = ""

    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }


    return (
        <View style={{ width: props.width ? props.width : "100%" }} >
            {props.label && <Text style={globalStyles.label} >{props.label}</Text>}
            <TouchableOpacity onPress={openModal} >
                <View style={[props.rounded ? roundedStyle : {}, props.rounded ? shadow : {}, {
                    marginBottom: props.marginTop != undefined ? props.marginTop : 10, marginHorizontal: props.marginHorizonta != undefined ? props.marginHorizonta : 10,
                    justifyContent: "center",
                }, props.square ? { ...globalStyles.inputSquare, ...globalStyles.shadow, } : {}, { borderBottomWidth: props.borderColor ? 1 : 0, borderBottomColor: props.borderColor, borderRadius: 5, paddingLeft: 5, height: props.height?props.height:40 }]} >
                    {/* <Picker
                    selectedValue={props.selectedValue}
                    onValueChange={(itemValue, itemIndex) => props.onValueChange(props.name, props.areObjects ? props.items[itemIndex-1]: itemValue)}>
                    <Picker.Item label={"Select"} value={-1} />
                    {fixedItems.map((value, index) => {
                        auxValue = value.toString();
                        auxValue = auxValue[0].toUpperCase() + auxValue.substr(1);
                        return <Picker.Item label={auxValue} value={props.areObjects? props.items[index]: auxValue} key={index} />
                    })}
                </Picker> */}
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "95%", }} >
                        <Text style={{ color: props.textColor ? props.textColor : "gray", fontSize: 16 }} >{props.selectedValue !== "" ? (props.selectedValue) : (props.placeholer ? props.placeholer : "Select")}</Text>
                        <Icon name="chevron-down" type="material-community" color={props.textColor ? props.textColor : undefined} />
                    </View>
                </View>
            </TouchableOpacity>
            <CustomModal open={modal} onClose={closeModal} noBorder animationIn="fadeIn" animationOut="fadeOut" >
                <ScrollView>

                    {fixedItems.map((value, key) => {
                        return (
                            <TouchableOpacity key={key} style={{ width: 300 }} onPress={() => {
                                props.onValueChange(props.name, props.objectLabel ? props.items[key] : value);
                                closeModal();
                            }} >
                                <Text style={{ fontSize: 20, color: props.selectedValue == value ? COLORS.PRIMARY_DARK : "gray", marginVertical: 5 }} >{value}</Text>
                            </TouchableOpacity>
                        )
                    })}
                    {fixedItems.length === 0 && <Text style={{ fontSize: 20, color: "gray", marginVertical: 5 }} >No items</Text>}
                </ScrollView>
            </CustomModal>
        </View>
    )
}

const roundedStyle = {
    backgroundColor: "#ecf0f1",
    height: 50,
    borderRadius: 25,
    borderBottomWidth: 0,
    paddingLeft: 10
}

const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
}

export default CustomPicker;