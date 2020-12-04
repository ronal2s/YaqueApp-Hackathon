import React, { useState } from 'react';
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons"
import { View } from 'react-native';
//Screens
import Home from "../screens/home";
import Login from "../screens/login";
import Settings from "./settings";
import Screen1 from "./screen1";
import ViewPost from "./home/community/post";
import ModalUser from "./modals/login";
import ModalNonUser from "./modals/register";
//Custom components
import CustomAlert from "../components/customAlert";
import LoadingGlobal from "../components/loadingModal";
//Styles
import styles from "../styles"
//Utils
import { GlobalContext, IGlobalContexts } from '../contexts/globalContexts';
import { COLORS, Screens, SECURE_KEYS } from '../utils/enums';
import { IAppContainer } from './container.d';
import { setStore } from '../utils/functions';

const Stack = createStackNavigator();

function AppContainer(props: IAppContainer) {
    const { globalContext, openModal } = props;
    const headerOptions = ({ navigation }) => ({
        headerStyle: styles.headerHome,
        headerTintColor: "white",
        // headerTitle: globalContext.context.user.player_info.full_name,
        headerRight: () => <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", marginHorizontal: 10 }} >
            <TouchableOpacity onPress={props.openNonUser} onLongPress={props.openUser} >
                <Icon name="account" color="white" size={35} />
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
                    <Stack.Screen name={Screens.Screen1} component={Screen1} />
                    <Stack.Screen name={Screens.Post} component={ViewPost} />
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

    const [alert, setAlert] = useState({ open: false, title: "", content: "", success: false });
    const [modals, setModals] = useState({ user: false, nonUser: false });

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

    const openUser = () => {
        setModals({ ...modals, user: true });
    }
    const closeUser = () => {
        setModals({ ...modals, user: false });
    }

    const openNonUser = () => {
        setModals({ ...modals, nonUser: true });
    }
    const closeNonUser = () => {
        setModals({ ...modals, nonUser: false });
    }

    return (
        <NavigationContainer>
            <AppContainer globalContext={{ context, setContext: auxSetContext }} openUser={openUser} openNonUser={openNonUser} />
            <CustomAlert open={alert.open} title={alert.title} content={alert.content} success={alert.success} onClose={closeAlert} />
            <LoadingGlobal open={context.loading} />
            <ModalUser open={modals.user} onClose={closeUser} />
            <ModalNonUser open={modals.nonUser} onClose={closeNonUser} />
        </NavigationContainer>
    );
}


export default App;