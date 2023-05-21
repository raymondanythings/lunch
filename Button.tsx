import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface TabBarButton extends BottomTabBarButtonProps {
  route: string;
  center: boolean;
}

const CustomTabBarButton = (props: TabBarButton) => {
  const {center, route, children, accessibilityState, onPress, style} = props;
  console.log(children, '<<<center');
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={styles.inactiveBtn}>
      {center ? <View style={styles.activeBtn}>{children}</View> : children}
    </TouchableOpacity>
  );
};

export default CustomTabBarButton;

const styles = StyleSheet.create({
  activeBtn: {
    // position: 'absolute',
    top: -20,
    // paddingBottom: 20,
    // flex: 1,
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgGapFiller: {
    backgroundColor: '#fff',
  },
});
