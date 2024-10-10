import * as React from 'react';
import 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import AllStackNavigator from './AllStackNavigator';
import { Text } from 'react-native';
const MainNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="TabHome"
      screenOptions={({route}) => ({
        tabBarStyle: {
          backgroundColor: '#9DD646',
          
          height: '11%',
          // position: 'relative',
        },
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'TabHome') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === 'Hoạt động') {
            iconName = focused ? 'calendar-sharp' : 'calendar-outline';
          } else if (route.name === 'TabSucKhoe') {
            iconName = focused ? 'shield' : 'shield-outline';
          } else if (route.name === 'TabThucDon') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          }
            else if (route.name === 'TabNhanXet') {
              iconName = focused ? 'reader' : 'reader-outline';
        
          } else if (route.name === 'TabLoiNhan') {
            iconName = focused
              ? 'chatbox-ellipses-sharp'
              : 'chatbox-ellipses-outline';
          }

          // You can return any component that you like here!
          return <Ionicons  name={iconName} size={35} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
      })}>
      {/* <Tab.Screen name="Hoạt động" component={HoatDong} /> */}

      {/* <Tab.Screen
        name="TabHome"
        component={AllStackNavigator}
        options={{
          tabBarLabel: (
            <Text allowFontScaling={false} style={{ fontSize: 12, color: 'black' }}>
              Trang chủ
            </Text>
          ),
          tabBarLabelStyle: {color: 'black',
          
          fontSize: 12,
           flex:0.5,
            },
        }}
        initialParams={{
          initialRouteName: 'Home',
        }}
      /> */}
<Tab.Screen
  name="TabHome"
  component={AllStackNavigator}
  options={({ route }) => ({
    tabBarLabel: () => (
      <Text allowFontScaling={false} style={{ fontSize: 12, color: 'black' }}>
        Trang chủ
      </Text>
    ),
  })}
  initialParams={{
    initialRouteName: 'Home',
  }}
/>
      <Tab.Screen
        name="TabSucKhoe"
        component={AllStackNavigator}
        options={({ route }) => ({
          tabBarLabel: () => (
            <Text allowFontScaling={false} style={{ fontSize: 12, color: 'black' }}>
              Sức khoẻ
            </Text>
          ),
        })}
        initialParams={{
          initialRouteName: 'SucKhoe',
        }}
      />
      
      <Tab.Screen
        name="TabThucDon"
        component={AllStackNavigator}
        options={({ route }) => ({
          tabBarLabel: () => (
            <Text allowFontScaling={false} style={{ fontSize: 12, color: 'black' }}>
              Thực đơn
            </Text>
          ),
        })}
        initialParams={{
          initialRouteName: 'ThucDon',
        }}
      />
      <Tab.Screen
        name="TabLoiNhan"
        component={AllStackNavigator}
        options={({ route }) => ({
          tabBarLabel: () => (
            <Text allowFontScaling={false} style={{ fontSize: 12, color: 'black' }}>
              Lời Nhắn
            </Text>
          ),
        })}
        initialParams={{
          initialRouteName: 'LoiNhan',
        }}
      />
       <Tab.Screen
        name="TabNhanXet"
        component={AllStackNavigator}
        options={({ route }) => ({
          tabBarLabel: () => (
            <Text allowFontScaling={false} style={{ fontSize: 12, color: 'black' }}>
              Nhận xét
            </Text>
          ),
        })}
        initialParams={{
          initialRouteName: 'NhanXet',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
