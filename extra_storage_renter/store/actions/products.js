//import a module located in a Different file
import Product from '../../models/product';
import { getDistance } from 'geolib';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_NEARBY_PRODUCTS = 'SET_NEARBY_PRODUCTS';

import * as firebase from "firebase";

const getDistances = (resData) => {
  const nearbyPlaces = [];

  for (const key in resData) {

    let distance = getDistance(global.location, {
      "lat": resData[key].lat,
      "lng": resData[key].lng
    });
    //filter to 50km the range of the storage showing on search
    if (distance < 50000) {

      nearbyPlaces.push(resData[key]);

    }
  }

  return nearbyPlaces;
}

export const fetchNearbyProducts = () => {

  return async dispatch => {
    // any async code you want!
    try {
      const response = await fetch(
        'https://extra-storage-1.firebaseio.com/products.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const allProducts = await response.json();
      const loadedProducts = [];
      const resData = getDistances(allProducts);
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price,
            resData[key].quantityNeeded,
            resData[key].lat,
            resData[key].lng,
          )
        );
      }

      dispatch({ type: SET_NEARBY_PRODUCTS, products: loadedProducts });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }

  };

};

export const fetchProducts = () => {

  return async dispatch => {
    // any async code you want!
    try {
      const response = await fetch(
        'https://extra-storage-1.firebaseio.com/products.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            'u1',
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price,
            resData[key].quantityNeeded,
            resData[key].lat,
            resData[key].lng,
          )
        );
      }

      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = productId => {
  return async dispatch => {
    const response = await fetch(
      `https://extra-storage-1.firebaseio.com/products/${productId}.json`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

const getImageFromFirebase = async (uri) => {
  const imageName = Math.round(+new Date() / 1000) + "." + uri.substr(uri.lastIndexOf('.') + 1);
  const response = await fetch(uri);
  const blob = await response.blob();
  const ref = firebase.storage().ref().child("images/" + imageName);
  const snapshot = await ref.put(blob);
  const imgURL = await snapshot.ref.getDownloadURL();
  return imgURL
};

export const createProduct = (title, description, price, quantityNeeded, imageUri, location) => {
  return async dispatch => {
    const imageUrl = await getImageFromFirebase(imageUri);
    const lat = location.lat;
    const lng = location.lng;
    // any async code you want!
    const response = await fetch(
      'https://extra-storage-1.firebaseio.com/products.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          quantityNeeded,
          imageUrl,
          price,
          lat,
          lng
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        price,
        quantityNeeded,
        imageUrl,
        lat,
        lng
      }
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async dispatch => {
    const response = await fetch(
      `https://extra-storage-1.firebaseio.com/products/${id}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
        lat,
        lng
      }
    });
  };
};
export const getMarkers = () => {

  return async dispatch => {
    // any async code you want!
    try {
      const response = await fetch(
        'https://extra-storage-1.firebaseio.com/products.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          {
            coordinate: {
              latitude: resData[key].lat,
              longitude: resData[key].lng,
            },
            title: "Title: " + resData[key].title,
            description: "Price: £" + resData[key].price.toString(),
          }

        );
      }
      return loadedProducts;
    } catch (err) {
      throw err;
    }

  };

};