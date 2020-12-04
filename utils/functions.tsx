import * as ExpoSecure from "expo-secure-store";
import * as SecureStorage from "expo-secure-store";
import { IAlert } from "../contexts/alertContext";
import { IGlobalContexts, IUser } from "../contexts/globalContexts";

export function toCapitalize(text: string) {
    return text[0].toUpperCase() + text.substr(1);
}

export function isEmpty(text: string) {
    return text.length == 0;
}

export function getStore(key: string) {
    return ExpoSecure.getItemAsync(key);
}

export function setStore(key: string, value: string) {
    return ExpoSecure.setItemAsync(key, value);
}

export function setContext(context: IGlobalContexts, obj: { user: IUser } | { alert: IAlert } | { loading: boolean }) {
    context.setContext({ ...context, ...obj })
    console.log("SetContext: ", JSON.stringify({ ...obj }));
}

export function validatePhone(value: string) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var phoneno2 = /^\(?([0-9]{3})\)?([0-9]{3})?([0-9]{4})$/;
    if (value.match(phoneno2) || value.match(phoneno)) {
        return true;
    }
    else {
        return false;
    }
}

{/* <ImageButton source={ClaroLogo} size={100} backgroundColor="#FFFAFA" effectDelay={100} onPress={() => toStep2(Suppliers.Claro)} />
<ImageButton source={EdenorteLogo} size={100} backgroundColor="#09abca" effectDelay={100} onPress={() => toStep2(Suppliers.Edenorte)} />
<ImageButton source={EdesurLogo} size={100} backgroundColor="#fd6b0d" effectDelay={200} onPress={() => toStep2(Suppliers.Edesur)} />
<ImageButton source={EdeesteLogo} size={100} backgroundColor="#ffdd00" effectDelay={200} onPress={() => toStep2(Suppliers.Edeeste)} />
<ImageButton source={CoraapplataLogo} size={100} backgroundColor="#0950a0" effectDelay={300} onPress={() => toStep2(Suppliers.Coraaplata)} />
<ImageButton source={CoraavegaLogo} size={100} backgroundColor="#e9e3e3" effectDelay={300} onPress={() => toStep2(Suppliers.Coraavega)} />
<ImageButton source={StarcableLogo} size={100} backgroundColor="#353788" effectDelay={400} onPress={() => toStep2(Suppliers.Starcable)} />
<ImageButton source={WindLogo} size={120} backgroundColor="#054171" effectDelay={400} onPress={() => toStep2(Suppliers.Wind)} />  */}
export function getColorEtSize(name: string) {
    switch (name) {
        case "Claro": return { size: 100, backgroundColor: "#FFFAFA" };
        case "claro": return { size: 100, backgroundColor: "#FFFAFA" };
        case "claro_postpago": return { size: 100, backgroundColor: "#FFFAFA" };
        case "Orange": return { size: 55, backgroundColor: "black" };
        case "altice_postpago": return { size: 55, backgroundColor: "black" };
        case "altice": return { size: 55, backgroundColor: "black" };
        case "Viva": return { size: 100, backgroundColor: "#a7cf38" };
        case "Digicel": return { size: 100, backgroundColor: "#ed1b2f" };
        case "Natcom": return { size: 100, backgroundColor: "#0365a3" };
        case "edenorte": return { size: 100, backgroundColor: "#09abca" };
        case "edesur": return { size: 100, backgroundColor: "#fd6b0d" };
        case "edeeste": return { size: 100, backgroundColor: "#ffdd00" };
        case "coraasan": return { size: 100, backgroundColor: "#0950a0" };
        case "caasd": return { size: 100, backgroundColor: "#e9e3e3" };
        case "coraaplata": return { size: 100, backgroundColor: "#0950a0" };
        case "coraavega": return { size: 100, backgroundColor: "#e9e3e3" };
        case "starcable": return { size: 100, backgroundColor: "#353788" };
        case "Wind": return { size: 100, backgroundColor: "#054171" };
        case "wind_paquetes": return { size: 100, backgroundColor: "#054171" };
    }
}

export const getRandomNumbers = (min: number, max: number) => {
    let randomNum = Math.random() * (max - min) + min;
    return Math.round(randomNum);
}

export function getStorage(key: string) {
    return SecureStorage.getItemAsync(key)
}

export function setStorage(key: string, value: string) {
    return SecureStorage.setItemAsync(key, value)
}

export async function getBlob(uri: string) {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
}