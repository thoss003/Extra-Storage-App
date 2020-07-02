//Importing a Component from a Library
import React, { useState } from 'react';
//import a module located in a Different file
import Colors from '../../constants/Colors';
import CartItemCheckout from '../../components/shop/CartItemCheckout';
import * as ordersActions from '../../store/actions/orders';

import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ActivityIndicator

} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as firebase from "firebase";

const Payment = props => {
  const dispatch = useDispatch();
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const [successMsg, setSuccessMsg] = useState('');
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
        ownerId: state.cart.items[key].ownerId,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const verifyPayment = async () => {

    setIsLoading(true);
    await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
    let tempPhone = global.userPhone;
    console.log(global.userPhone);
    for (const item in cartItems) {
      let ownerId = cartItems[item].ownerId;
      firebase.database().ref('users').orderByChild('email').equalTo(ownerId).once('value', (snapshot) => {
        let key = Object.keys(snapshot.val())[0];
        console.log("Key" + key);
        firebase.database().ref('users/' + key).update({
          balance: snapshot.toJSON()[key]['balance'] + cartItems[item].productPrice * cartItems[item].quantity,
        });
      }).catch((error) => { setErrorMsg('There was a problem completing your request') });

    }
    setSuccessMsg('Payment Deposited Successfully');
    console.log(global.userPhone);
    global.userPhone = tempPhone;
    console.log(global.userPhone);

    setIsLoading(false);
  };
  return (
    <View style={styles.container}>


      <FlatList

        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItemCheckout
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
          />
        )}
      />

      <Text style={{ fontSize: 16, fontFamily: 'open-sans-bold', marginTop: 10, marginBottom: 10 }}>Total amount: £{cartTotalAmount}</Text>
      {isLoading ? (
        <ActivityIndicator size="small" color={Colors.primary} />
      ) : (
          <Button
            color={Colors.accent}
            title="Checkout"
            disabled={cartItems.length === 0}
            onPress={verifyPayment}
          />
        )}
      <Text style={{ color: 'red' }}>{errorMsg}</Text>
      <Text style={{ color: 'green' }}>{successMsg}</Text>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})
export default Payment;