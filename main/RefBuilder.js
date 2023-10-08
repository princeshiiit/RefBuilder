import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CreateTab} from './TabScreens/tabCreate.js';
import {ViewTab} from './TabScreens/tabView.js';
import Ionicons from 'react-native-vector-icons/Ionicons.js'; // You can choose a different icon library

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Create"
        component={CreateTab}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="paper-plane" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="View"
        component={ViewTab}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs/>
    </NavigationContainer>
  );
}
