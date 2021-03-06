import { createAppContainer,createSwitchNavigator,} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {DrawerItems} from 'react-navigation-drawer'

import Colors from "../constants/Colors";
import { Platform,SafeAreaView,Button,View, } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import React from "react";
import { Ionicons } from '@expo/vector-icons';
import UserDonationsScreen from '../screens/user/UserDonationsScreen'
import EditDonationScreen from '../screens/user/EditDonationScreen'
import DistributionsOverviewScreen from '../screens/distribution/DistributionsOverviewScreen'
import AuthScreen from '../screens/user/AuthScreen'
import StartupScreen from '../screens/StartupScreen';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary

};
const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: DistributionsOverviewScreen,
    
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-man' : 'ios-man'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);



const AdminsNavigator = createStackNavigator(
    {
      UserProducts: UserDonationsScreen,
      EditProduct: EditDonationScreen
    },
    {
      navigationOptions: {
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-color-fill' : 'ios-color-fill'}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      },
      defaultNavigationOptions: defaultNavOptions
    }
  );
  const Navigator = createDrawerNavigator(
    {
      Donations: AdminsNavigator,
      Distributions: ProductsNavigator,
      
    },
    {
      contentOptions: {
        activeTintColor: Colors.primary
      },
      contentComponent: props => {
        const dispatch = useDispatch();
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItems {...props} />
              <Button
                title="Logout"
                color='#228B22'
                onPress={() => {
                  dispatch(authActions.logout());
                  // props.navigation.navigate('Auth');
                }}
              />
            </SafeAreaView>
          </View>
        );
      }
    }
  );
  const AuthNavigator = createStackNavigator({
    Auth:AuthScreen
  
  },
  {
    defaultNavigationOptions: defaultNavOptions
  
  }
    
  )
  
  const MainNavigator=createSwitchNavigator({
    Startup: StartupScreen,
    Auth:AuthNavigator,
    donation:Navigator
    
  
  })



export default createAppContainer( MainNavigator);
