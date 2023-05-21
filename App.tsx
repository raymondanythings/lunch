import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {NavigationContainer, TabActions} from '@react-navigation/native';
import {Text, TouchableOpacity, View, Dimensions} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomTabBarButton from './Button';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();
const Screen1 = () => (
  <View>
    <Text>Screen1</Text>
  </View>
);
const Screen2 = () => (
  <View>
    <Text>Screen2</Text>
  </View>
);
const Screen3 = () => (
  <View>
    <Text>Screen3</Text>
  </View>
);
function TabBar({
  state,
  descriptors,
  navigation,
  insets,
  ...rest
}: BottomTabBarProps) {
  console.log(rest, '<<<');
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            const action = TabActions.jumpTo(route.name, route.params);
            navigation.dispatch(action);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, alignItems: 'center'}}>
            <AntDesign
              name="windowso"
              size={25}
              style={{color: isFocused ? '#673ab7' : '#222'}}
            />
            <Text style={{color: isFocused ? '#673ab7' : '#222'}}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="screen1"
          screenOptions={({route}) => ({
            headerShown: false,
            // tabBarIcon: ({color, size, focused}) => {
            //   let iconName;
            //   if (route.name === 'screen1') {
            //     iconName = focused ? 'ios-home-sharp' : 'ios-home-outline';
            //   } else if (route.name === 'screen2') {
            //     iconName = focused ? 'settings' : 'settings-outline';
            //   } else {
            //     iconName = 'md-notifications-outline';
            //   }
            //   return <Icon name={iconName} size={22} color={color} />;
            // },
            // tabBarLabel: props => {
            //   return route.name !== 'screen2' ? <Text>{route.name}</Text> : null;
            // },
            tabBarButton: props => {
              return (
                <CustomTabBarButton
                  center={route.name === 'screen2'}
                  route="home"
                  {...props}
                />
              );
            },
            tabBarStyle: {
              // borderRadius: 30,
              // marginVertical: 50,
              // backgroundColor: 'transparent',
              position: 'absolute',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
          })}>
          <Tab.Screen component={Screen1} name="screen1" />
          <Tab.Screen component={Screen2} name="screen2" />
          <Tab.Screen component={Screen3} name="screen3" />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
