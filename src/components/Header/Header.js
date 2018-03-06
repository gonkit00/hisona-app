import React from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo';
import styles from './styles';

const renderLeft = () => (
  <View style={styles.navBarItem}>
    <Text style={styles.headerTitle}>Hisona</Text>
  </View>
);

const Header = () => (
  <View style={styles.container}>
    <LinearGradient
      style={{ height: '100%' }}
      start={[0.1, 0.4]}
      colors={['#2575FC', '#8C5DAA', '#E64D4D']}
    >
      <View style={styles.navItemsContainer}>{renderLeft()}</View>
    </LinearGradient>
  </View>
);

export default Header;
