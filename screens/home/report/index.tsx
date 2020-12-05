import React, { useContext, useState } from "react";
import { Alert, Keyboard } from "react-native";
import { Button, Card, Icon } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from 'expo-image-picker';
import MapView from 'react-native-maps';

//Custom Components
import CustomButton from "../../../components/button";
import CustomInput from "../../../components/input";
import CustomPicker from "../../../components/picker";
//Utils
import styles from "./styles";
import { View } from "../../../styles/emotions";
import { COLORS, SECURE_KEYS } from "../../../utils/enums";
import models from "../../../utils/models";
//Service
import * as FirestoreService from "../../../services/firestore";
//Modals
import ModalMap from "./modalMap";
import { IFPost } from "../../../utils/globalInterfaces";
import { getStore } from "../../../utils/functions";
import { GlobalContext } from "../../../contexts/globalContexts";

function ReportTab() {
    const [form, setForm] = useState<IFPost>({ ...models.report, title: "Reporte de basura", description: "He observado mucha basura en esta parte de la ciudad, cerca del rio", priority: "Alta" });
    const [loading, setLoading] = useState(false);
    const [modalMap, setModalMap] = useState(false);
    const [region, setRegion] = useState(null);

    const globalContext = useContext(GlobalContext);

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
        if(form.picture) {
            setForm({...form, picture: ""});
        } else {
            Alert.alert("Seleccionar una imágen", "Escoger una opción", [
                { text: "Cámara", onPress: pickCameraPhoto },
                { text: "Álbum", onPress: _pickImage },
                { text: "Cancelar", style: "cancel" },
            ])
        }
    }

    const onPressPicture = () => {
        Alert.alert("¿Desea eliminar la imagen?", "Selecciona una opción", [
            { text: "Sí", onPress: () => setForm({ ...form, picture: "" }) },
            { text: "Cancelar", style: "cancel" }
        ])
    }

    const onCloseMap = (region) => {
        if (region) {
            setRegion(region);
        }
        setModalMap(false);
    }

    const onPickLocation = () => {
        if (region) {
            setForm({ ...form, region: null });
            setRegion(null);
        } else {
            setModalMap(true);
        }
    }

    const onReport = async () => {
        setLoading(true);
        const obj = { ...form };
        let name = "Anónimo";
        obj.user.name = name;
        obj.region = {...region};
        const user = await getStore(SECURE_KEYS.USER);
        const nonUser = await getStore(SECURE_KEYS.NON_USER);
        if(user) {
            const jsonUser = JSON.parse(user);
            obj.user = {...jsonUser};
            obj.verified = true;
        }

        if(nonUser && !user) {
            obj.user.name = nonUser;
        }

        //Push report to firebase
        FirestoreService.putReport(obj, () => {
            setForm({...models.report});
            setRegion(null);
            globalContext.setAlert("Notificación", "Reporte enviado!");
            setLoading(false);
        })
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
                        {/* <Card.Title>Adjuntar imagen</Card.Title> */}
                        {form.picture !== "" && <Card.Image onPress={onPressPicture} source={{ uri: form.picture }} />}
                        <Button title={form.picture !== ""?"Eliminar imagen": "Seleccionar imagen"} type="clear" onPress={onPickMedia} />
                    </Card>
                    <Card containerStyle={{ margin: 0, borderWidth: 0 }} >
                        {/* <Card.Title>Seleccionar ubicación</Card.Title> */}
                        {region &&
                            <View flex={1} height={150} >
                                <MapView pitchEnabled={false} rotateEnabled={false} zoomEnabled={false} scrollEnabled={false}
                                    style={{ ...styles.map }}
                                    region={region}
                                // showsUserLocation={true}
                                >
                                </MapView>
                                <View style={{
                                    left: '48.8%',
                                    position: 'absolute',
                                    top: '25%'
                                }}>
                                    <Icon name="map-marker-alt" type="font-awesome-5" color={COLORS.PRIMARY} size={40} />
                                </View>
                            </View>}
                        <Button title={region ? "Eliminar ubicación" : "Seleccionar ubicación"} type="clear" onPress={onPickLocation} />
                    </Card>
                    <CustomButton title="Reportar" loading={loading} buttonColor={COLORS.SECONDARY} onPress={onReport} />
                </Card>
                <ModalMap open={modalMap} onClose={onCloseMap} />
            </View>
        </KeyboardAwareScrollView>
    )
}

export default ReportTab;