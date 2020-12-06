import { getUIDCode } from "./functions";
/*
    Notas:
    Recordar que para un caso real la base de datos debe ser tal: reports/dates/postAboutThatDate
    Ahora mismo será: reports/postsWithOwnDates
    para optimizar tiempo y recursos
*/
const models = {
    report: {
        id: getUIDCode(),
        title: "",
        description: "",
        priority: "Baja",
        picture: "",
        region: {
            longitudeDelta: 0,
            latitudeDelta: 0,
            latitude: 0,
            longitude: 0,
        },
        // latitude: "",
        // longitude: "",
        solved: false,
        verified: false,
        user: { name: "", email: "" },
        // date: new Date().toLocaleDateString("en-US"),
        date: +new Date(),
        comments: []
    }
}

export default models;