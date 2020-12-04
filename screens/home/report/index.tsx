import React, { useState } from "react";
import { Keyboard } from "react-native";
import { Card } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomButton from "../../../components/button";
import CustomInput from "../../../components/input";
import CustomPicker from "../../../components/picker";
import { View } from "../../../styles/emotions";
import { COLORS } from "../../../utils/enums";
import models from "../../../utils/models";

function ReportTab() {
    const [form, setForm] = useState({ ...models.report });
    const [loading, setLoading] = useState(false);

    const handleinputs = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
    }

    const onPickMedia = () => {
        // setLoading(true);

        // setLoading(false);
    }

    const onReport = () => {
        
    }
    

    return (
        <KeyboardAwareScrollView>
            <View >
                <Card>
                    <Card.Title>Reportar problema</Card.Title>
                    <CustomInput label="Título" placeholder="Ej: Reporte de basura" name="title" value={form.title} onChangeText={handleinputs} />
                    <CustomInput label="Descripción" placeholder="Desarrollar el problema" name="description" value={form.description} textArea numberOfLines={5} onChangeText={handleinputs} />
                    <CustomPicker label="Prioridad" items={["Alta", "Media", "Baja"]} name="priority" borderColor={COLORS.LABEL} selectedValue={form.priority} onValueChange={handleinputs} />
                    <Card>
                        <Card.Title>Adjuntar imagen o video</Card.Title>
                        {/* <Card.Image source={{uri: "https://www.diariodigital.com.do/wp-content/uploads/2016/09/Rio-Yaque-del-Norte.jpg"}} /> */}
                        <CustomButton title="Seleccionar" onPress={onPickMedia} />
                    </Card>
                    <CustomButton title="Reportar" buttonColor={COLORS.SECONDARY} onPress={onReport} />
                </Card>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default ReportTab;