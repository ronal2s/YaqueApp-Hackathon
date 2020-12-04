import React, { useState, useContext, useEffect } from "react";
import { TouchableWithoutFeedback, Keyboard, Image, Animated, Dimensions, SafeAreaView } from "react-native";
import { Button } from "react-native-elements";

//Custom Components
import CustomInput from "../../components/input";
import FadeEffect from "../../components/effects/fadein";
//Utils
import { COLORS } from "../../utils/enums";
import { isEmpty } from "../../utils/functions";
import { InputReferences } from "../../utils/globalInterfaces";
import { GlobalContext } from "../../contexts/globalContexts";
//Styles
import globalStyles from "../../styles";
import { View } from "../../styles/emotions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//Media
const Logo = require("../../assets/logo.png");
const screen = Dimensions.get("screen")


function loginScreen(props) {
    const [refPassword, setRefPassword] = useState<InputReferences>();
    const [refcorreo, setRefcorreo] = useState<InputReferences>();

    const [form, setForm] = useState({ correo: "renys", password: "123456" });
    const [errors, setErrors] = useState({ correo: "", password: "" });
    const [loading, setLoading] = useState(false);

    const { navigation } = props;
    const globalContext = useContext(GlobalContext);

    const [heightAnimated, setHeightAnimated] = useState(new Animated.Value(screen.height))
    const [borderAnimated, setBorderAnimated] = useState(new Animated.Value(0))


    useEffect(() => {
        decreaseHeight();
    }, []);

    const decreaseHeight = () => {
        Animated.timing(heightAnimated, {
            toValue: 80,
            duration: 1500,
            useNativeDriver: false
        }).start()
        Animated.timing(borderAnimated, {
            toValue: 150,
            duration: 340,
            useNativeDriver: false
        }).start()
    }
    const toInputPassword = () => refPassword.input.focus();

    const setReferences = (nameInput: string, ref: any) => {
        switch (nameInput) {
            case "password": setRefPassword(ref); break;
            case "correo": setRefcorreo(ref); break;
        }
    }

    const handleInputs = (name: string, text: string) => {
        form[name] = text;
        setForm({ ...form });
    }

    const onPressLogin = () => {
        let error = false;
        errors.correo = ""; errors.password = "";

        if (isEmpty(form.correo)) {
            errors.correo = "Usuario obligatorio";
            setErrors({ ...errors });
            refcorreo.shake();
            error = true;
        }
        if (isEmpty(form.password)) {
            errors.password = "Contraseña obligatoria";
            setErrors({ ...errors });
            refPassword.shake();
            error = true;
        }
        if (!error) {
            setLoading(true);
            console.log(form);
            //Firestore Call
        }
    }



    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps="always" >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <SafeAreaView style={{ height: Dimensions.get("screen").height }} >
                    <View style={{ backgroundColor: COLORS.PRIMARY, flex: 1, justifyContent: "center", alignItems: "center" }} >
                        {/* <FadeEffect >
                            <Image source={Logo} style={{ height: 100, width: 300 }} resizeMode="contain" />
                        </FadeEffect> */}
                        <View style={{ width: 300, zIndex: 0 }} >
                            <CustomInput rounded label="Correo" name="correo" value={form.correo} errorMessage={errors.correo} labelStyle={globalStyles.inputLabel}
                                returnKeyType="next" setRef={setReferences} onSubmitEditing={toInputPassword} onChangeText={handleInputs}
                                leftIcon="account" keyboardType="decimal-pad"
                            />

                            <CustomInput rounded label="Clave" name="password" value={form.password} errorMessage={errors.password} password labelStyle={globalStyles.inputLabel}
                                returnKeyType="done" setRef={setReferences} onChangeText={handleInputs} onSubmitEditing={onPressLogin}
                                leftIcon="lock"
                            />

                            <View style={globalStyles.center} >
                                <Button title="Iniciar sesión" type="solid" buttonStyle={{ backgroundColor: "white", borderRadius: 10, width: 200 }} titleStyle={{ color: "black" }} loading={loading}
                                    loadingProps={{ color: COLORS.PRIMARY }}
                                    onPress={onPressLogin} />
                            </View>
                        </View>
                        <Animated.View
                            style={{
                                backgroundColor: COLORS.SECONDARY,
                                position: "absolute",
                                bottom: 0,
                                borderTopLeftRadius: borderAnimated,
                                borderTopRightRadius: borderAnimated,
                                width: "100%",
                                // height: screen.height / 2,
                                height: heightAnimated,
                            }}
                        />

                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    )
}

export default loginScreen;