import React, { useState, useEffect, useContext } from "react";
//Custom components
import Modal from "../../components/modal";
//Utils
import { GlobalContext } from "../../contexts/globalContexts";
import { Text, View } from "react-native";
import ViewRows from "../../components/viewRows";
import CircleButton from "../../components/circleButton";
import { CODES, COLORS, Lotteries } from "../../utils/enums";
import { getLotteryColor } from "../../utils/functions";
import { URL_API } from "../../utils/constants";
import CustomInput from "../../components/input";
import globalStyles from "../../styles";
import { Button } from "react-native-elements";
import { changePassword } from "../../utils/api";

interface iModalLottery {
    open: boolean,
    onClose: () => void
}

function ModalPickLottery(props: iModalLottery) {
    const { open, onClose } = props;
    const [form, setform] = useState({ current_password: "", new_password: "" });
    const [loading, setLoading] = useState(false);

    const globalContexts = useContext(GlobalContext);

    const handleInputs = (name: string, value: string) => {
        form[name] = value;
        setform({ ...form });
    }


    const onRequestPassword = () => {
        setLoading(true);
        changePassword(form, (error, json) => {
            const success = json.cod === CODES.SUCCESS;
            globalContexts.setAlert("Alerta", json.msg, !success);
            setLoading(false);
        })
    }


    return (
        <Modal open={open} onClose={onClose} title="Cambiar contraseña"  >
            <CustomInput rounded label="Contraseña antigua" name="current_password" value={form.current_password} password labelStyle={globalStyles.inputLabel}
                returnKeyType="next" onChangeText={handleInputs} leftIcon="lock" />
            <CustomInput rounded label="Nueva contraseña" name="new_password" value={form.new_password} password labelStyle={globalStyles.inputLabel}
                returnKeyType="next" onChangeText={handleInputs} leftIcon="lock" />
            <View style={globalStyles.center} >
                <Button title="Solicitar cambio" type="solid" buttonStyle={{ backgroundColor: COLORS.PRIMARY, borderRadius: 10, width: 200 }} titleStyle={{ color: "white" }} loading={loading}
                    loadingProps={{ color: COLORS.WHITE }}
                    onPress={onRequestPassword} />
            </View>
        </Modal>
    )
}

export default ModalPickLottery;