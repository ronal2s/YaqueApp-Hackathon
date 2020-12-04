import React from "react";
import { Image } from "react-native";
import { SquareButton } from "../styles/emotions";
import Slide from "./effects/slide";
interface IImageButton {
    source: { uri: string },
    // source: string,
    text?: string,
    backgroundColor?: string,
    textColor?: string,
    onPress?: () => void,
    size?: number,
    effectDelay?: number
}
function ImageButton(props: IImageButton) {
    return (
        <Slide delay={props.effectDelay} >
            <SquareButton backgroundColor={props.backgroundColor} onPress={props.onPress} >
                {/* <Image source={{ uri: props.source }} style={{ width: props.size ? props.size : 50, flex: 1 }} resizeMode="contain" /> */}
                <Image source={props.source} style={{ width: props.size ? props.size : 50, flex: 1 }} resizeMode="contain" />
            </SquareButton>
        </Slide>
    )
}

export default ImageButton;