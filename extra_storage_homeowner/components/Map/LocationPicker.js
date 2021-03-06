//Importing a Component from a Library
import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Entypo } from '@expo/vector-icons';
//import a module located in a Different file
import Colors from '../../constants/Colors';
import MapPreview from './MapPreview';

const LocationPicker = props => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();

  const mapPickedLocation = props.navigation.getParam('pickedLocation');

    const {onLocationPicked} = props;

  useEffect(() => {
      if (mapPickedLocation) {
        setPickedLocation(mapPickedLocation);
        onLocationPicked(mapPickedLocation);
      }
  },[mapPickedLocation, onLocationPicked]);
//Request permission to use the GPS

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
    } catch (err) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map.',
        [{ text: 'Okay' }]
      );
    }
    setIsFetching(false);
  };
  const pickOnMapHandler = () => {
    props.navigation.navigate('MapScreen');
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview 
       style={styles.mapPreview}
       location={pickedLocation}
       onPress={pickOnMapHandler}
       >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          
          <Text>No location chosen yet!</Text>
        )
        }
      </MapPreview>
      <Button
        icon={<Entypo name="location" size={24}/>}
        title="Get User Location"
        color={Colors.primary}
        onPress={getLocationHandler}
      />
      <Button
          title="Pick on Map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderRadius:10,
    borderColor: '#ccc',
    borderWidth: 1
  }
});

export default LocationPicker;
