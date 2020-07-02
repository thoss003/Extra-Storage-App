//Importing a Component from a Library
import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
//import a module located in a Different file
import MapPreviw from '../../components/Map/MapPreview';

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam('productId');
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId)
  );
  const dispatch = useDispatch();

  const selectedLocation = {lat:selectedProduct.lat, lng:selectedProduct.lng};
  const showMapHandler = () => {
    props.navigation.navigate('MapScreen', {
      readonly: true,
      initialLocation: selectedLocation
    });
  };
  const selectCart = () => {
    props.navigation.navigate('Cart')
  };
  
  return (
    <ScrollView>
       <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <Text style={styles.price}>£{selectedProduct.price}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
      <Text style={styles.price}>capacity:{selectedProduct.capacity}</Text>

      <Text>Location</Text>
      <MapPreviw
      style={styles.mapPreview}
      location={selectedLocation}
          onPress={showMapHandler}
          />
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center'
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold'
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  },
  mapPreview: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 5
  }
});
export default ProductDetailScreen;
