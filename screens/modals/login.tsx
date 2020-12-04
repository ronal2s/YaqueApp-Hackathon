import React, { useEffect, useState } from "react";
import CustomButton from "../../components/button";
import CustomInput from "../../components/input";
import CustomModal from "../../components/modal";
import { Title, View } from "../../styles/emotions";
import { SECURE_KEYS } from "../../utils/enums";
import { getStore } from "../../utils/functions";

interface ILoginView {
    open: boolean,
    onClose: () => void,
}
function LoginView(props: ILoginView) {
    const [user, setUser] = useState({ name: "", email: "" });//Name, email
    const [form, setForm] = useState({ email: "", password: "" });

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        const _user = await getStore(SECURE_KEYS.USER);
        if(_user) {
            const jsonUser = JSON.parse(_user);
            setUser(jsonUser);
        }
        // setUser({name: "Renys", email: "ronal2w@gmail.com"})
    }

    const handleInputs = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
    }

    const onLogin = () => {

    }

    const onLogout = () => {

    }

    return (
        <CustomModal open={props.open} onClose={props.onClose} >
            <Title>Iniciar sesión</Title>
            {user.name !== "" ? <View>
                <Title>Bienvenido {user.name} </Title>
                <CustomButton title="Cerrar sesión" onPress={onLogout} />
            </View> : <View>
                    <CustomInput square label="Correo" name="email" value={form.email} onChangeText={handleInputs} />
                    <CustomInput square label="Clave" name="password" value={form.password} password onChangeText={handleInputs} />
                    <CustomButton title="Iniciar sesión" onPress={onLogin} />
                </View>}
        </CustomModal>
    )
}

export default LoginView;