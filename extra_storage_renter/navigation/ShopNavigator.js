//Importing a Component from a Library
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from "react-navigation-tabs";
//import a module located in a Different file
import Homepage from '../src/component/HomePage';
import Chat from '../src/component/Chat';
import Payment from '../src/component/Payment';
import Profile from '../src/component/Profile';
import Setting from '../src/component/Setting';
import Login from '../src/component/Login';
import Signup from '../src/component/Signup';
import Loading from '../src/component/Loading';
import MapScreen from '../screens/map/MapScreen';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import ChatWithUser from '../screens/user/ChatWithUser';


const AppTabNavigator = createBottomTabNavigator(

  {

    Home: {
      screen: Homepage,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-home" size={24} color={tintColor} />
      }

    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-person" size={30} color={tintColor} />
      }

    },

    Chat: {
      screen: Chat,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-chatbubbles" size={30} color={tintColor} />
      }

    },


    Setting: {
      screen: Setting,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-settings" size={24} color={tintColor} />
      },


    },

  },

  {

    tabBarOptions: {
      activeTintColor: "#1E90FF",
      inactiveTintColor: "#ccc",
      //showLabel: false
      style: {
        borderTopColor: 'black',
        backgroundColor: 'black',
        elevation: 5,
      }
    }

  }
)

const AuthStack = createStackNavigator(
  {

    Login: Login,
    Register: Signup,

  });

const pages = createStackNavigator({
  Home: AppTabNavigator,
  Chat: Chat,
  MapScreen: MapScreen,
  ProductsOverview: ProductsOverviewScreen,
  ProductDetail: ProductDetailScreen,
  Cart: CartScreen,
  OrdersScreen: OrdersScreen,
  ChatWithUser: ChatWithUser,
  UserProductsScreen: UserProductsScreen,
  EditProductScreen: EditProductScreen,
  Payment: Payment,

});

const ShopNavigator = createSwitchNavigator({

  Loading: Loading,
  AppTabNavigator,
  Auth: AuthStack,
  nav: pages,

},
  {
    initialRouteName: "Loading",

  }

);

export default createAppContainer(ShopNavigator);