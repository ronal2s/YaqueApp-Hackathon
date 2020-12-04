import React, { useEffect } from "react";
import { Animated, Easing } from "react-native";

const BounceEffect = (props: { type: "bounce" | "elastic", delay?: number, children?: any, sizeView: number }) => {
    let opacity = new Animated.Value(0);

    useEffect(() => {
        animate();
    }, [])

    const animate = () => {
        opacity.setValue(0);
        Animated.timing(opacity, {
            toValue: 1,
            duration: 1200 + props.delay,
            useNativeDriver: false,
            easing: props.type === "elastic" ? Easing.elastic(4) : Easing.bounce
        }).start();
    };

    const size = opacity.interpolate({
        inputRange: [0, 1],
        // outputRange: [0, 80]
        outputRange: [100, props.sizeView]
    });

    const animatedStyles = [
        {
            opacity,
            width: size,
            height: size,
        }
    ];

    return (
        <Animated.View style={animatedStyles} >
            {props.children}
        </Animated.View>

    );
};

export default BounceEffect;