import React, { useEffect, useState } from "react";
import CustomButton from "../../components/button";
import CustomInput from "../../components/input";
import CustomModal from "../../components/modal";
//Utils
import { Title } from "../../styles/emotions";
import { SECURE_KEYS } from "../../utils/enums";
import { getStore, setStore } from "../../utils/functions";

interface IRegisterView {
    open: boolean,
    onClose: () => void,
}
function RegisterView(props: IRegisterView) {
    const [name, setName] = useState("");

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        const _name = await getStore(SECURE_KEYS.NON_USER);
        if (_name) setName(_name);
    }

    const handleInputs = (name: string, value: string) => {
        setName(value);
    }

    const onSave = () => {
        setStore(SECURE_KEYS.NON_USER, name);
        props.onClose();
    }

    
    return (
        <CustomModal open={props.open} onClose={props.onClose} >
            <Title>Información personal</Title>
            <CustomInput square label="Nombres" name="name" value={name} onChangeText={handleInputs} />
            <CustomButton title="Guardar" onPress={onSave} />
        </CustomModal>
    )
}

export default RegisterView;