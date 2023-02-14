import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function NewTask({ navigation, route }) {
  const [region, setRegion] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState('');
  const [latitude, setLatitude] = useState(route.params.latitude || null);
  const [longitude, setLongitude] = useState(route.params.longitude || null);
  const id = route.params.nome

  useEffect(() => {
    getLocationAsync();
    getGoogleMapsApiKey();
  }, []);

  async function getLocationAsync() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      setErrorMessage('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.010,
      longitudeDelta: 0.010,
    });
  }

  async function getGoogleMapsApiKey() {
    try {
      const apiKey = await AsyncStorage.getItem('googleMapsApiKey');
      setGoogleMapsApiKey(apiKey);
    } catch (error) {
      console.error(error);
    }
  }

  if (!region) {
    return null;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onPress={e => console.log(e.nativeEvent)}
        apiKey={googleMapsApiKey}
      >
        <Marker
          key="0"
          coordinate={{
            latitude,
            longitude
          }}
          title={id}
          description=""
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
