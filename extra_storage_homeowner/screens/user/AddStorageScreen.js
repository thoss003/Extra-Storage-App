//Importing a Component from a Library
import React, { useState, useCallback, useReducer } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Alert,
    KeyboardAvoidingView
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';
//import a module located in a Different file
import * as productsActions from '../../store/actions/products';
import Input from '../../components/UI/Input';

import ImgPicker from '../../components/Map/ImagePicker';
import LocationPicker from '../../components/Map/LocationPicker';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidates = {
            ...state.inputValidates,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidates) {
            updatedFormIsValid = updatedFormIsValid && updatedValidates[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidates: updatedValidates,
            inputValues: updatedValues
        };
    }
    return state;
};

const AddProductScreen = props => {


    const [selectedImage, setSelectedImage] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: '',
            imageUrl: '',
            description: '',
            price: '',
            capacity: '',
        },
        inputValidates: {
            title: false,
            description: false,
            price: false,
            capacity: false,
        },
        formIsValid: false
    });

    let imageTakenHandler;
    imageTakenHandler = imagePath => {
        setSelectedImage(imagePath);
    };

    let locationPickedHandler = useCallback(location => {
        console.log(location);
        setSelectedLocation(location);
    }, []);


    let validForm = () => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please check the errors in the form.', [
                { text: 'OK' }
            ]);
            return false
        }
        return true
    };

    const addProductHandler = useCallback(() => {
        if (!validForm()) {
            return
        }
        dispatch(
            productsActions.createProduct(
                formState.inputValues.title,
                formState.inputValues.description,
                +formState.inputValues.price,
                +formState.inputValues.capacity,
                selectedImage,
                selectedLocation
            )
        );
        props.navigation.goBack();

    });

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
            keyboardVerticalOffset={100}
        >
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id="title"
                        label="Title"
                        errorText="Please enter a valid title!"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                    />

                    <Input
                        id="price"
                        label="Price"
                        errorText="Please enter a valid price!"
                        placeholder="Enter the daily price"
                        keyboardType="decimal-pad"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                    />

                    <Input
                        id="description"
                        label="Description"
                        errorText="Please enter a valid description!"
                        keyboardType="default"
                        returnKeyType="next"
                        autoCapitalize="sentences"
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        onInputChange={inputChangeHandler}
                    />

                    <Input
                        id="capacity"
                        label="Capacity"
                        placeholder="Enter the number of boxes you can store"
                        errorText="Please enter the number of boxes that you are capable to store!"
                        keyboardType="decimal-pad"
                        onInputChange={inputChangeHandler}
                    />

                    <ImgPicker onImageTaken={imageTakenHandler} />
                    <LocationPicker navigation={props.navigation} onLocationPicked={locationPickedHandler} />

                    <Button style={styles.userBtn} onPress={addProductHandler}>Add</Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );


};

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    userBtn: {
        backgroundColor: "#20B2AA",
        padding: 5,
        width: "100%",
        borderRadius: 10,
    }
});

export default AddProductScreen;