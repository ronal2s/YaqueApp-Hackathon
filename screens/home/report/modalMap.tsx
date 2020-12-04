import React, { Component, useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import MapView from 'react-native-maps';
import CustomButton from '../../../components/button';
import CustomModal from '../../../components/modal';
import { COLORS } from '../../../utils/enums';

import styles from "./styles";

interface IMapPick {
    open: boolean,
    onClose: (region?: { latitude: number, longitude: number, latitudeDelta: number,  longitudeDelta: number}) => void,
}

function App(props: IMapPick) {
    const [region, setRegion] = useState({
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
    })
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                };
                setRegion(region);
            },
            (error) => {
                alert(error);
            },
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 5000 },
        );
    }, [])


    // Update state on region change
    const onRegionChange = region => {
        setRegion(region);
    }

    // Action to be taken after select location button click
    const onLocationSelect = () => {
        props.onClose(region);
        // alert(`${region.latitude} - ${region.longitude}`)
    }

    return (
        <CustomModal open={props.open} onClose={() => props.onClose(null)} disableSwipe >

            <View style={styles.container}>
                <View style={{ flex: 2 }}>
                    {!!region.latitude && !!region.longitude &&
                        <MapView
                            style={{ ...styles.map }}
                            initialRegion={region}
                            showsUserLocation={true}
                            onRegionChangeComplete={onRegionChange}
                        >
                        </MapView>
                    }

                    <View style={styles.mapMarkerContainer}>
                        <Icon name="map-marker-alt" type="font-awesome-5" color={COLORS.PRIMARY} size={40} />
                    </View>
                </View>

            </View>
            <CustomButton title="Seleccionar esta ubicación" onPress={onLocationSelect} />
        </CustomModal>
    );
}
export default App