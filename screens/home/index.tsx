import React, { useContext, useState } from "react";
import { Text, ScrollView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
//Custom Components
import CircleButton from "../../components/circleButton";
//Utils
import { GlobalContext } from "../../contexts/globalContexts";
import { Screens, COLORS, TabScreens } from "../../utils/enums";
//Style
import Separator from "../../components/separator";
import { View } from "../../styles/emotions";
//Tabs
import NewsTab from "./news";
import ReportTab from "./report";
import CommunityTab from "./community";

const Tab = createBottomTabNavigator();


function Home(props: { navigation: any; }) {
    const { navigation } = props;
    const [loading, setLoading] = useState(true);
    const globalContexts = useContext(GlobalContext);

    const onPressSettings = () => {
        navigation.navigate(Screens.Settings)
    }

    const openScreen = (screen: Screens) => {
        navigation.navigate(screen);
    }

    return (
        <NavigationContainer independent>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === TabScreens.Home) {
                            iconName = "home";
                        } else if (route.name === TabScreens.Report) {
                            iconName = "inbox-multiple"
                        } else if (route.name === TabScreens.Advices) {
                            iconName = "file-document-outline"
                        } else iconName = "account";
                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                    },

                })}
                tabBarOptions={{
                    activeTintColor: COLORS.PRIMARY_DARK,
                    inactiveTintColor: "gray",
                    keyboardHidesTabBar: true,

                }}
            >
                <Tab.Screen name={TabScreens.News} component={NewsTab} initialParams={{ parentNavigation: navigation }} />
                <Tab.Screen name={TabScreens.Report} component={ReportTab} initialParams={{ parentNavigation: navigation }} />
                <Tab.Screen name={TabScreens.Community} component={CommunityTab} initialParams={{ parentNavigation: navigation }} />

            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Home;