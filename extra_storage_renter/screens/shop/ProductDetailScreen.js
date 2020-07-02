//Importing a Component from a Library
import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, Image, Button, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
//import a module located in a Different file
import MapPreviw from '../../components/Map/MapPreview';
import * as firebase from 'firebase';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';
const ProductDetailScreen = props => {
  const [user, setUser] = useState ('');

  const productId = props.navigation.getParam ('productId');
  const selectedProduct = useSelector (state =>
    state.products.nearbyProducts.find (prod => prod.id === productId)
  );
  const dispatch = useDispatch ();
  const selectedLocation = {lat: selectedProduct.lat, lng: selectedProduct.lng};
  const showMapHandler = () => {
    props.navigation.navigate ('MapScreen', {
      readonly: true,
      initialLocation: selectedLocation,
    });
  };
  const selectCart = () => {
    props.navigation.navigate ('Cart');
  };
  const [name, setName] = useState ('');
  const [phone, setPhone] = useState ('');
  useEffect (() => {
    setUser (firebase.auth ());
    firebase
      .database ()
      .ref ('users')
      .orderByChild ('email')
      .equalTo (selectedProduct.ownerId)
      .once ('value', snapshot => {
        let key = Object.keys (snapshot.val ())[0];
        setName (snapshot.toJSON ()[key]['name']);
        setPhone (snapshot.toJSON ()[key]['phoneNumber']);
        
      });
  });
  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add to Cart"
          onPress={() => {
            dispatch (cartActions.addToCart (selectedProduct));
            selectCart ();
          }}
        />
        <View style={{marginTop: 10}}>
          <Button
            color={Colors.primary}
            style={{color: 'red'}}
            title="Chat With User"
            onPress={() => {
              props.navigation.navigate ('ChatWithUser', {
                name,
                phone,
              });
            }}
          />
        </View>
      </View>
      <Text style={styles.price}>${selectedProduct.price}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
      <Text style={styles.price}>
        Capacity:{selectedProduct.quantityNeeded}
      </Text>

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
    headerTitle: navData.navigation.getParam ('productTitle'),
  };
};

const styles = StyleSheet.create ({
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold',
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  mapPreview: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 5,
  },
});

export default ProductDetailScreen;
