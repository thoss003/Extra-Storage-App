//Importing a Component from a Library
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
//import a module located in a Different file
import * as locationAction from '../../store/actions/locations';
import * as productsActions from '../../store/actions/products';

import Colors from '../../constants/Colors';

const MapScreen = props => {
  const initialLocation = props.navigation.getParam('initialLocation');
  const readonly = props.navigation.getParam('readonly');
  const dispatch = useDispatch();
  const [region, setRegion] = useState({
    latitude: global.location.lat,
    longitude: global.location.lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [markers, setMarkers] = useState(
    [
      {
        coordinate: {
          latitude: 52.5223609,
          longitude: -0.1212417,
        },
        title: "TITLE",
        description: "DESCRIPTION",
      },
    ]);

  async function call() {


    const data = await dispatch(productsActions.getMarkers());

    if (markers.length != data.length) {
      setMarkers(data);
    }
    if (global.location.lat == 100 && global.location.lng == 100 && !error) {
      const loca = await dispatch(locationAction.getLocation()).catch((err) => { setError(true); setErrorMsg(err.toString()) });


      setRegion({
        latitude: global.location.lat,
        longitude: global.location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      });
    }

  }
  useEffect(() => {
    call();

  });

  if (!error) {
    return (
      <MapView
        style={styles.map}
        region={region}
      >
        {markers.map(marker => (
          <Marker
            key={marker.description}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    );
  }
  else {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View >
          <Text style={{ textAlign: "center" }}>{errorMsg}</Text>
        </View>
      </SafeAreaView>

    );
  }
};

MapScreen.navigationOptions = navData => {
  const saveFn = navData.navigation.getParam('saveLocation');
  const readonly = navData.navigation.getParam('readonly');
  if (readonly) {
    return {};
  }

};

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : Colors.primary
  }
});

export default MapScreen;
