//Importing a Component from a Library
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItemCheckout = props => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>Quantity: {props.quantity} </Text>
        <Text style={styles.mainText}>{props.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>
        {props.deletable && (
          <TouchableOpacity
            onPress={props.onRemove}
            style={styles.deleteButton}
          >
            <Ionicons
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              size={23}
              color="red"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    // width:'80%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginHorizontal: 20
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  quantity: {
    fontFamily: 'open-sans',
    color: '#888',
    fontSize: 16,
    padding:10,
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
    padding:10,
  },
  deleteButton: {
    marginLeft: 20
  }
});

export default CartItemCheckout;
