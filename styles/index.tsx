import { StyleSheet } from "react-native";
import { COLORS } from "../utils/enums";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default StyleSheet.create({
    headerHome: {
        backgroundColor: COLORS.PRIMARY,
    },
    inputLabel: {
        fontWeight: "200"
    },
    inputRounded: {
        backgroundColor: "#ecf0f1",
        // height: 50,
        height: hp("6%"),
        borderRadius: hp("5%"),
        // borderRadius: 0,
        borderBottomWidth: 0,
        paddingLeft: 10
    },
    inputSquare: {
        backgroundColor: "#ecf0f1",
        height: hp("5%"),
        // height: 50,
        borderRadius: 5,
        borderBottomWidth: 0,
        paddingLeft: 10,
    },
    iconRounded: {
        height: 50,
        width: 50,
        backgroundColor: COLORS.PRIMARY,
        borderRadius: 50 / 2,
        marginRight: 1,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textShadow: {
        // textShadowColor: "black", 
        // textShadowRadius: 8, 
        // textShadowOffset: {width: 1, height: 3}
        textShadowColor: "black",
        textShadowRadius: 10,
        textShadowOffset: { width: 0, height: 1 }
    },
    label: {
        fontWeight: "bold",
        // color: "#86929e",
        color: COLORS.GRAY,
        fontSize: 16,
        marginLeft: 10,
    },
    center: {
        justifyContent: "center",
        alignItems: "center"
    },
    circleButton: {
        // width: 100,
        width: wp("24%"),
        height: wp("24%"),
        // borderRadius: 80 / 2,
        borderRadius: 10,
        // marginHorizontal: 5,
        marginVertical: 5,
        alignItems: "center",
        justifyContent: "center",        
    },
    titleHeaderRight: {
        color: "white",
        marginRight: 15,
        fontWeight: "bold",
        fontSize: 16
    },
    viewRows: {
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    title: {
        textAlign: "center",
        color: COLORS.GRAY,
        fontSize: 22,
        fontWeight: "700"
    },
    titlePrimary: {
        textAlign: "center",
        color: COLORS.PRIMARY,
        fontSize: 22,
        fontWeight: "700"
    },
    viewContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
})