//Importing a Component from a Library
import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as firebase from "firebase";
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
//import a module located in a Different file
import productsReducer from './store/reducers/products';
import ShopNavigator from './navigation/ShopNavigator';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import locationReducer from './store/reducers/location';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAN2pjN6mbOp2sa6jwyABrWuPAQUV-pvlY",
  authDomain: "extra-storage-1.firebaseapp.com",
  databaseURL: "https://extra-storage-1.firebaseio.com",
  projectId: "extra-storage-1",
  storageBucket: "extra-storage-1.appspot.com",
  messagingSenderId: "48221218129",
  appId: "1:48221218129:web:889875d6d29c0c0478df70"
};

try {
  firebase.initializeApp(firebaseConfig);
}
catch (err) {
  console.log("duplicate warning ");
}

console.disableYellowBox = true;

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};
/*'combineReducers' takes an object full of slice reducer functions,
and creates a function that outputs a corresponding state object with the same keys*/
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  locations: locationReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk), composeWithDevTools());
global.location = {
  'lat': 100,
  'lng': 100,
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

/*
Schwarzmüller M. 2020. The Practical Guide to React Native: Build iOS/Android Apps | Udemy. [ONLINE]
Available at: https://www.udemy.com/course/react-native-the-practical-guide/. [Accessed 03 June 2020].
*/