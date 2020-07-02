//Importing a Component from a Library
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
//import a module located in a Different file
import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';
import * as locationAction from '../../store/actions/locations';
import Colors from '../../constants/Colors';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from '@expo/vector-icons';

import Homepage from '../../src/component/HomePage';
import Chat from '../../src/component/Chat';
import Profile from '../../src/component/Profile';
import Setting from '../../src/component/Setting';
import { Location, Permissions } from 'expo';

const ProductsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const products = useSelector(state => state.products.nearbyProducts);
  const location = useSelector(state => state.locations);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      const loca = await dispatch(locationAction.getLocation());
      await dispatch(productsActions.fetchNearbyProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {

    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadProducts
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    });
  };
  const selectCart = () => {
    props.navigation.navigate('Cart')
  };
  if (error) {
    console.log(error);
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No Space found. Maybe start adding some!</Text>
      </View>
    );
  }


  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
              selectCart();
            }}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = navData => {

  return {
    headerTitle: 'All Products',
    headerRight: () =>
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>,

  };
};

const BottomTabNavigator = createBottomTabNavigator(

  {
    Homepage: {
      screen: Homepage,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          <Ionicons name="ios-home"
            size={34}
            color={tintColor} />
      }

    },
    Chat: {
      screen: Chat,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          <Ionicons name="ios-chatboxes"
            size={24}
            color={tintColor} />

      }

    },

    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          <Ionicons name="ios-person"
            size={30}
            color={tintColor} />
      }

    },

    Setting: {
      screen: Setting,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          <Ionicons name="ios-settings"
            size={24}
            color={tintColor} />
      },

    },

  },

  {

    tabBarOptions: {
      activeTintColor: "#161F3D",
      inactiveTintColor: "#B8BBC4",
    }
  }
);

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ProductsOverviewScreen;
