import styled from "styled-components/native";
import CSS from 'csstype';
import { COLORS } from "../utils/enums";
import { FlexAlignType } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

interface ITitle {
    color?: string,
}

export const Title = styled.Text((props: ITitle) => ({
    fontSize: 24,
    textAlign: "center" as const,
    color: props.color ? props.color : COLORS.PRIMARY,
    fontWeight: "bold" as const
}))

interface IText {
    color?: string,
    textAlign?: "auto" | "center" | "justify" | "left" | "right",
    fontWeight?: "bold" | "normal" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900",
    marginTop?: number,
    marginBottom?: number,
    fontSize?: number
}
export const Text = styled.Text((props: IText) => ({
    color: props.color,
    textAlign: props.textAlign as any,
    fontWeight: props.fontWeight as any,
    marginTop: props.marginTop,
    marginBottom: props.marginBottom,
    fontSize: props.fontSize
}))

interface IView {
    justifyContent?: "space-around" | "space-between" | "space-evenly" | "center" | "flex-end" | "flex-start",
    alignItems?: FlexAlignType,
    padding?: number,
    marginTop?: number, marginBottom?: number, marginLeft?: number, marginRight?: number,
    backgroundColor?: string, borderRadius?: number, width?: number | string, height?: number,
    borderWidth?: number, borderColor?: string, borderBottomWidth?: number,
    flexDirection?: "row" | "row-reverse" | "column" | "column-reverse",
    flexWrap?: "nowrap" | "wrap" | "wrap-reverse",
    paddingHorizontal?: number, borderTopRightRadius?: number, borderTopLeftRadius?: number,
    position?: "absolute" | "relative", left?: number, right?: number, top?: number, bottom?: number,
    flex?: number, marginHorizontal?: number, paddingLeft?: number, paddingRight?: number,
}
export const View = styled.View((props: IView) => ({
    justifyContent: props.justifyContent,
    alignItems: props.alignItems,
    padding: props.padding,
    paddingLeft: props.paddingHorizontal ? props.paddingHorizontal : props.paddingLeft,
    paddingRight: props.paddingHorizontal ? props.paddingHorizontal : props.paddingRight,
    marginTop: props.marginTop,
    marginBottom: props.marginBottom,
    marginLeft: props.marginHorizontal ? props.marginHorizontal : props.marginLeft,
    marginRight: props.marginHorizontal ? props.marginHorizontal : props.marginRight,
    backgroundColor: props.backgroundColor as any,
    borderRadius: props.borderRadius,
    height: props.height,
    flexDirection: props.flexDirection,
    flexWrap: props.flexWrap as any,
    borderColor: props.borderColor as any,
    borderWidth: props.borderWidth,
    width: props.width,
    borderTopLeftRadius: props.borderTopLeftRadius, borderBottomWidth: props.borderBottomWidth,
    borderTopRightRadius: props.borderTopRightRadius,
    position: props.position as any,
    left: props.left, right: props.right, top: props.top, bottom: props.bottom,
    flex: props.flex

}))

interface ISquareButton {
    backgroundColor?: string,
    height?: number,
    width?: number,
    marginLeft?: number, marginRight?: number, marginTop?: number,
    color?: string,
    borderColor?: string,
}
export const SquareButton = styled.TouchableOpacity((props: ISquareButton) => ({
    backgroundColor: props.backgroundColor,
    height: props.height ? props.height : wp("35%"),
    width: props.width ? props.width : wp("35%"),
    marginLeft: props.marginLeft,
    marginRight: props.marginRight,
    marginTop: props.marginTop ? props.marginTop : 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: props.borderColor ? 1 : 0,
    borderColor: props.borderColor,
    // shadowColor: "#000",
    // shadowOffset: {
    //     width: 0,
    //     height: 2,
    // },
    // shadowOpacity: "0.25px",
    // shadowRadius: 3.84,
    // elevation: "5px",

}))
interface IBottomLine {
    width?: number | string
}
export const BottomLine = styled.View((props: IBottomLine) => ({
    height: 1,
    width: props.width ? props.width : "100%",
    backgroundColor: COLORS.GRAY,
    marginTop: 5,
    marginBottom: 5
}))

interface IScrollView {
    padding?: number,
}

export const ScrollView = styled.ScrollView((props: IScrollView) => ({
    padding: props.padding
}))