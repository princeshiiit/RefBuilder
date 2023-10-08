import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CreateTab} from './TabScreens/tabCreate.js';
import {ViewTab} from './TabScreens/tabView.js'; // You can choose a different icon library
import {Image} from 'react-native';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Create"
        component={CreateTab}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('./assets/icons/paper.png')}
              style={{width: size, height: size, tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="View"
        component={ViewTab}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('./assets/icons/briefcase.png')}
              style={{width: size, height: size, tintColor: color}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
