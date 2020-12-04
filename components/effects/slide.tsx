import React, { useEffect, useState } from "react";
import { Animated } from "react-native";

function Slide(props: { delay?: number, children: any}) {
    const [x, setX] = useState(new Animated.Value(-500));
    const { delay } = props;
    useEffect(function () {
        // Animated.spring(x, { toValue: 0, delay: 200, speed: 1 }).start();
        Animated.spring(x, { toValue: 0, delay: 200 + delay, speed: 1, useNativeDriver: true }).start();
    }, [])

    return (
        <Animated.View style={{ transform: [{ translateX: x }] }}>
            {props.children}
        </Animated.View>
    )
}

export default Slide;