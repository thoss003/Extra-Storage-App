//Importing a Component from a Library
import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
//import a module located in a Different file
import Colors from '../../constants/Colors';

const CustomHeaderButton = props => {
  return (
    <HeaderButton
    /*Props stands for “properties,” 
    to send data from one React component to another React component.*/
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : Colors.primary}
    />
  );
};

export default CustomHeaderButton;
