import firebase from 'firebase';
import moment from "moment";
import "firebase/auth";
import "firebase/firestore";
import { Collections, Documents, KEYS } from "../utils/enums";
import { getBlob, getStorage } from '../utils/functions';


const firebaseConfig = {
    apiKey: "AIzaSyBXnVrMt6dqx9mFtprP97vvsjTCSOMPzL0",
    authDomain: "rioyaque-20150.firebaseapp.com",
    projectId: "rioyaque-20150",
    storageBucket: "rioyaque-20150.appspot.com",
    messagingSenderId: "863809874074",
    appId: "1:863809874074:web:24944e2cb1a99f64259723"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();


export const logout = () => {
    return firebase.auth().signOut()
}

export const getDb = () => { return db }


export const getNews = async () => {
    let obj: any = await (await db.collection(Collections.NEWS).doc(Documents.DATA).get()).data() as object;
    const keysObject = Object.keys(obj);
    const auxObjects = { ...obj };
    obj = [];
    keysObject.forEach(key => {
        //@ts-ignore
        obj.push(auxObjects[key])
    })
    return obj;
}

export const updateData = async (new_report: any) => {
    let data = await (await db.collection(Collections.REPORTS).doc(Documents.DATA).get()).data();
    data.push(new_report);
    return db.collection(Collections.REPORTS).doc(Documents.DATA).update(data)
}


export const putReport = async (item: { sector: string, street: string, picture: string, firstTime: string }, callback: () => void) => {
    const uid = await getStorage(KEYS.UID);
    const auxItem = { ...item };
    const momentTime = moment().format("MM/DD/YYYY");

    const storageUser = firebase.storage().ref(`reports/${new Date().toLocaleDateString("en")}/${uid}`);
    const promise = new Promise(async (resolve, reject) => {
        try {
            if (item.picture !== "") {
                console.log("dentro")
                const currentImage = await storageUser.put(await getBlob(item.picture));
                const imageURL = await currentImage.ref.getDownloadURL();
                auxItem.picture = imageURL;
            }
            let data = await (await db.collection(Collections.REPORTS).doc(Documents.DATA).get()).data();
            console.log("fulldata: ", data)
            if (!data) {
                data = {
                    data: []
                }
            }
            //Para guardarlo con fecha
            // if (!data[momentTime]) {

            //     data[momentTime] = []
            // }
            // data[momentTime].push(auxItem);
            data.data.push(auxItem);
            await db.collection(Collections.REPORTS).doc(Documents.DATA).set({ ...data })
            resolve();
        } catch (error) {
            console.log(error)
            alert(error);
        }
    })
    promise.then((result) => {
        callback();
    })

}
