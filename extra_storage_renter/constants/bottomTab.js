//Importing a Component from a Library
import { createBottomTabNavigator } from "react-navigation-tabs";
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
//import a module located in a Different file
import Homepage from '../src/component/HomePage';
import Chat from '../src/component/Chat';
import Profile from '../src/component/Profile';
import Setting from '../src/component/Setting';


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
)

export default BottomTabNavigator;

