
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../screens/context/AuthContext';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import PostCreateScreen from '../screens/PostCreateScreen';
import PostEditScreen from '../screens/PostEditScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SplashScreen from '../screens/SplashScreen';


const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { authState, splashLoading } = useContext(AuthContext);

  useEffect(() => {
    console.log('authState:', authState);
    console.log('splashLoading:', splashLoading);
  }, [authState, splashLoading]);

  if (splashLoading) {
    return <SplashScreen />;
  }

  return (
   
    <NavigationContainer>
      <Stack.Navigator>
        {authState.isAuthenticated ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Post Create" component={PostCreateScreen} />
            <Stack.Screen name="Post Edit" component={PostEditScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  
  );
};

export default Navigation;