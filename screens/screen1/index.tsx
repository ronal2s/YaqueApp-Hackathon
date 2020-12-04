import React, { useContext } from "react";
import { View } from "react-native";
import { Card } from "react-native-elements";
//Styles
import { GlobalContext } from "../../contexts/globalContexts";
import globalStyles from "../../styles";

function InitConfig(props: any) {
    const { navigation } = props;

    const globalContexts = useContext(GlobalContext);

    return (
        <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }} >
            <Card containerStyle={[globalStyles.shadow, { width: "80%" }]} >
                <Card.Title>Screen 1</Card.Title>
                
            </Card>
        </View>
    )
}

export default InitConfig;