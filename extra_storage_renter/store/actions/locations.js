export const SET_LOCATION = 'SET_LOCATION';
//Importing a Component from a Library
import { useState } from 'react';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
export const getLocation = () => {

  return async dispatch => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      throw new Error('Location Module Is Not Supported on Android Emulator');
    } else {

      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Permission to access location was denied');
      }

      let locations = await Location.getCurrentPositionAsync({});
      global.location = {
        'lat': locations.coords.latitude,
        'lng': locations.coords.longitude,
      }

      dispatch({ type: SET_LOCATION, location: locations });
    }
  };
}