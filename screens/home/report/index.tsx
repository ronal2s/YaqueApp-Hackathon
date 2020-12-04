import React, { useState } from "react";
import { Alert, Keyboard } from "react-native";
import { Button, Card } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from 'expo-image-picker';
//Custom Components
import CustomButton from "../../../components/button";
import CustomInput from "../../../components/input";
import CustomPicker from "../../../components/picker";
//Utils
import { View } from "../../../styles/emotions";
import { COLORS } from "../../../utils/enums";
import models from "../../../utils/models";

function ReportTab() {
    const [form, setForm] = useState({ ...models.report });
    const [loading, setLoading] = useState(false);

    const handleinputs = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
    }

    const pickCameraPhoto = async () => {
        try {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                // quality: 1,
                quality: 0.5,
            });
            if (!result.cancelled) {
                //@ts-ignore
                setForm({ ...form, picture: result.uri });
            }
        } catch (E) {
            console.log(E);
        }
    }

    const _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                // quality: 1,
                quality: 0.5,
            });
            if (!result.cancelled) {
                //@ts-ignore
                setForm({ ...form, picture: result.uri });
            }
        } catch (E) {
            console.log(E);
        }
    }
    const onPickMedia = () => {
        Alert.alert("Seleccionar una imágen", "Escoger una opción", [
            { text: "Cámara", onPress: pickCameraPhoto },
            { text: "Álbum", onPress: _pickImage },
            { text: "Cancelar", style: "cancel" },
        ])
    }

    const onPressPicture = () => {
        Alert.alert("¿Desea eliminar la imagen?", "Selecciona una opción", [
            { text: "Sí", onPress: () => setForm({ ...form, picture: "" }) },
            { text: "Cancelar", style: "cancel" }
        ])
    }

    const onReport = () => {
        const obj = { ...form };
        //Push report to firebase
    }


    return (
        <KeyboardAwareScrollView>
            <View >
                <Card containerStyle={{ margin: 0 }} >
                    <Card.Title>Reportar problema</Card.Title>
                    <CustomInput label="Título" placeholder="Ej: Reporte de basura" name="title" value={form.title} onChangeText={handleinputs} />
                    <CustomInput label="Descripción" placeholder="Desarrollar el problema" name="description" value={form.description} textArea numberOfLines={5} onChangeText={handleinputs} />
                    <CustomPicker label="Prioridad" items={["Alta", "Media", "Baja"]} name="priority" borderColor={COLORS.LABEL} selectedValue={form.priority} onValueChange={handleinputs} />
                    <Card containerStyle={{ margin: 0, borderWidth: 0 }} >
                        <Card.Title>Adjuntar imagen o video</Card.Title>
                        {form.picture !== "" && <Card.Image onPress={onPressPicture} source={{ uri: form.picture }} />}
                        <Button title="Seleccionar" type="clear" onPress={onPickMedia} />
                    </Card>
                    <CustomButton title="Reportar" buttonColor={COLORS.SECONDARY} onPress={onReport} />
                </Card>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default ReportTab;