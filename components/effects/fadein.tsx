import React, { Component, useEffect, useState } from "react";
import { Animated, Text, View, StyleSheet, Button } from "react-native";

function FadeEffect(props: { delay?: number, children?: any }) {
    const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(0));

    useEffect(() => {
        fadeIn();
    }, [])
    const fadeIn = () => {
        Animated.timing(fadeAnimation, {
            toValue: 1,
            duration: 1000 + props.delay,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnimation, {
            toValue: 0,
            duration: 4000,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={[{ opacity: fadeAnimation }]}>
            {props.children}
        </Animated.View>
    );
}
// <View style={styles.buttonRow}>
//     <Button title="Fade In" onPress={this.fadeIn} />
// </View>
// <View style={styles.buttonRow}>
//     <Button title="Fade Out" onPress={this.fadeOut} />
// </View>

export default FadeEffect;