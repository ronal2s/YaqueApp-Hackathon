import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { FontAwesome5 as Icon } from "@expo/vector-icons"
import globalStyles from "../styles";
import Slide from "./effects/slide";
import FadeEffect from "./effects/fadein";
import BounceEffect from "./effects/bounce";
import { View } from "../styles/emotions";
import { COLORS } from "../utils/enums";

type ButtonProps = {
    onPress?: () => void,
    color: string,
    icon?: string,
    text?: string,
    effectDelay?: number,
    imgSource?: { uri: string },
    imgSize?: number,
    effect?: "fade" | "slide" | "bounce"
}

function CircleButton(props: ButtonProps) {
    const content = <TouchableOpacity onPress={props.onPress} >
        {!props.imgSource && <View style={[globalStyles.circleButton, { backgroundColor: props.color }]} >
            <Icon name={props.icon} color="white" size={32} />
            <View position="absolute"  borderBottomLeftRadius={10} borderBottomRightRadius={10} bottom={0} backgroundColor={COLORS.SECONDARY} width="100%" height={7} />
        </View>}
        {props.imgSource && <View style={[globalStyles.circleButton, { backgroundColor: props.color }]} >
            <Image source={props.imgSource} style={{ width: props.imgSize ? props.imgSize : wp("25%"), height: props.imgSize ? props.imgSize : wp("25%") }} resizeMode="contain" />
        </View>}
        <Text style={{
            color: "black",
            textAlign: "center",
            fontWeight: "200"
        }} >
            {props.text}
        </Text>
    </TouchableOpacity>

    if (props.effect === "slide") {
        return (
            <Slide delay={props.effectDelay} >
                {content}
            </Slide>

        )
    } else if (props.effect === "fade") {
        return (
            <FadeEffect delay={props.effectDelay} >
                {content}
            </FadeEffect>
        )
    } else if (props.effect === "bounce") {
        return (
            <View style={{ marginBottom: 40 }} >
                <BounceEffect type="bounce" sizeView={wp("24%")} delay={props.effectDelay} >
                    {content}
                </BounceEffect>
            </View>
        )
    }
    return content
}

export default CircleButton;