//Libraries
import React from 'react';
import {
    Text,
    View
} from 'react-native';
import Modal from "react-native-modal";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons"
import { Animation, CustomAnimation } from 'react-native-animatable';

type ModalProps = {
    open: boolean,
    onClose: () => void,
    onShow?: () => void,
    onHide?: () => void,
    color?: string,
    height?: number,
    title?: string,
    titleColor?: string,
    titleIcon?: string | boolean,
    titleIconColor?: string | boolean,
    children: React.ReactNode,
    animationIn?: Animation | CustomAnimation
    animationOut?: Animation | CustomAnimation,
    disableSwipe?: boolean,

}

function CustomModal(props: ModalProps) {
    const { open, onClose, onShow, onHide, height, children } = props;
    const _onModalShow = onShow ? onShow : Default;
    const _onClose = onClose ? onClose : Default;
    const _onHide = onHide ? onHide : Default;
    // let colorScheme = useColorScheme();
    let darkThemeMidView = { backgroundColor: props.color ? props.color : "white", height, borderRadius: 10, padding: 10 }
    function Default() { }

    return (
        <Modal isVisible={open} onModalShow={_onModalShow} animationIn={props.animationIn ? props.animationIn : "slideInDown"} animationOut={props.animationOut ? props.animationOut : "slideOutDown"}
            onModalHide={_onHide} onSwipeComplete={props.disableSwipe ? () => console.log() : _onClose} swipeDirection={props.disableSwipe?undefined:"right"}
            onBackButtonPress={_onClose} onBackdropPress={_onClose}  >
            <View style={darkThemeMidView}>
                <View style={{ flexDirection: "row", justifyContent: "center" }} >
                    {props.titleIcon && <Icon name={props.titleIcon} size={32} color={props.titleIconColor} style={{ marginRight: 10 }} />}
                    {props.title && <Text style={{ fontWeight: "100", fontSize: 22, textAlign: "center", marginBottom: 10, color: props.titleColor ? props.titleColor : "black" }} >{props.title}</Text>}
                </View>
                {children}
            </View>
        </Modal>
    )

}
export default CustomModal;