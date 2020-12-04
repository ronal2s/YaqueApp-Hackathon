import React from 'react';
import { View, Text } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { COLORS } from '../utils/enums';
import globalStyles from '../styles';

interface IDatePicker {
    dateTime?: boolean,
    label?: string,
    name: string,
    value: any,
    marginLeft?: number,
    marginRight?: number,
    onChange: (name: string, date: any) => void,
}

function CustomDatePicker(props: IDatePicker) {
    return (
        <View>
            <Text style={[globalStyles.label, { color: COLORS.LABEL, marginLeft: 20 }]} >{props.label}</Text>
            <DatePicker style={{ width: 200 }} date={props.value} mode="date" placeholder="Select date" format="YYYY-MM-DD"
                // maxDate={new Date().toLocaleDateString()} 
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        right: 0,
                        top: 4,
                        marginRight: 0,
                    },
                    dateInput: {
                        marginLeft: props.marginLeft >= 0 ? props.marginLeft : 10,
                        marginRight: props.marginRight >= 0 ? props.marginRight : 36,
                        // marginRight: 20,
                        ...globalStyles.shadow,
                        backgroundColor: COLORS.INPUT,
                        borderWidth: 0,
                        borderRadius: 5,
                    }
                }}
                onDateChange={(date) => props.onChange(props.name, date)}
            />
        </View>
    );
};

export default CustomDatePicker;