import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DotIndicator } from 'react-native-indicators';

const styles = StyleSheet.create({
  messageBubble: {
    width: 44,
    backgroundColor: '#E7E7E7',
    borderRadius: 16,
    marginTop: 16,
    marginRight: 8,
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 14,
  },
});

const TypingIndicator = () => (
  <View style={styles.messageBubble}>
    <DotIndicator
      animationDuration={1000}
      color="#898989"
      count={3}
      size={5}
    />
  </View>
);

export default TypingIndicator;
