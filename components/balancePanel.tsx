import React, { useContext } from "react";
import { GlobalContext } from "../contexts/globalContexts";
import { Text, View } from "../styles/emotions";
import { COLORS } from "../utils/enums";

function BalancePanel(props: any) {
    const globalContext = useContext(GlobalContext);
    return (
        <View padding={5} flexDirection="row" justifyContent="space-around" alignItems="center" backgroundColor={COLORS.PRIMARY} height={50} >
            <View>
                <Text color="white" >Balance: </Text>
                <Text color="white">${globalContext.user.totalBalance.toFixed(2)}</Text>
            </View>
            <View>
                <Text color="white" >Comisión: </Text>
                <Text color="white">$0.00</Text>
            </View>
            <View>
                <Text color="white" >Deuda: </Text>
                <Text color="white">$0.00</Text>
            </View>
        </View >
    )
}

export default BalancePanel;