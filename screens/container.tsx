import React, { useState } from 'react';
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5 as Icon } from "@expo/vector-icons"
//Screens
import Home from "../screens/home";
import Login from "../screens/login";
import Settings from "./settings";
import Screen1 from "./screen1";
//Custom components
import CustomAlert from "../components/customAlert";
//Styles
import styles from "../styles"
//Utils
import LoadingGlobal from "../components/loadingModal";
import { GlobalContext, IGlobalContexts } from '../contexts/globalContexts';
import { COLORS, Screens, SECURE_KEYS } from '../utils/enums';
import { IAppContainer } from './container.d';
import { View } from 'react-native';
import { setStore } from '../utils/functions';

const Stack = createStackNavigator();

function AppContainer(props: IAppContainer) {
    const { globalContext, openModal } = props;
    const headerOptions = ({ navigation }) => ({
        headerStyle: styles.headerHome,
        headerTintColor: "white",
        // headerTitle: globalContext.context.user.player_info.full_name,
        headerRight: () => <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", marginHorizontal: 10 }} >
            <TouchableOpacity onPress={props.signOut} >
                <Icon name="sign-out-alt" color="white" size={15} />
            </TouchableOpacity>
        </View>,
    })

    const stepsRecargaHeader = { headerStyle: { elevation: 0, shadowOpacity: 0, backgroundColor: COLORS.PRIMARY } }

    return (
        <GlobalContext.Provider value={{ ...globalContext.context, setContext: globalContext.setContext }}>
            {globalContext.context.user.logged ?
                <Stack.Navigator screenOptions={headerOptions} >
                    <Stack.Screen name={Screens.Home} component={Home} options={{ headerTitle: "Yaque Rescate" }} />
                    <Stack.Screen name={Screens.Settings} component={Settings} options={stepsRecargaHeader} />
                    <Stack.Screen name={Screens.Screen1} component={Screen1}  />
                </Stack.Navigator>
                :
                <Stack.Navigator initialRouteName={Screens.Login} >
                    <Stack.Screen name={Screens.Login} component={Login} options={{ headerShown: false }} />
                </Stack.Navigator>
            }
        </GlobalContext.Provider>
    )

}

function App() {
    const newAlert = (title: string, content: string, error?: boolean) => { setAlert({ open: true, title, content, success: error ? false : true }) }
    const [context, setContext] = useState<IGlobalContexts>({
        // user: { logged: false, username: "Renys De La Cruz", balance: 3500 }
        user: { logged: true },
        setAlert: newAlert
    });

    const [alert, setAlert] = useState({ open: false, title: "", content: "", success: false })

    const auxSetContext = (object) => {
        setContext({ ...context, ...object })
    }

    const closeAlert = () => {
        setAlert({ ...alert, open: false });
    }

    const signOut = () => {
        setStore(SECURE_KEYS.KEEP_LOGIN, "false");
        auxSetContext({ user: { ...context.user, logged: false } })
    }

    return (
        <NavigationContainer>
            <AppContainer globalContext={{ context, setContext: auxSetContext }} signOut={signOut} />
            <CustomAlert open={alert.open} title={alert.title} content={alert.content} success={alert.success} onClose={closeAlert} />
            <LoadingGlobal open={context.loading} />
        </NavigationContainer>
    );
}


export default App;