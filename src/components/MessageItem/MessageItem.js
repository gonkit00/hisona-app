import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import styles from './styles';

const MessageItem = (props) => {
  const leftSpacer = props.direction === 'left' ? null : <View style={{ width: 80 }} />;
  const rightSpacer = props.direction === 'left' ? <View style={{ width: 80 }} /> : null;

  const bubbleStyles =
    props.direction === 'left'
      ? [styles.messageBubble, styles.messageBubbleLeft]
      : [styles.messageBubble, styles.messageBubbleRight];

  const bubbleTextStyle =
    props.direction === 'left' ? styles.messageBubbleTextLeft : styles.messageBubbleTextRight;

  return (
    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
      {leftSpacer}
      <View style={bubbleStyles}>
        <Text style={bubbleTextStyle}>{props.text}</Text>
      </View>
      {rightSpacer}
    </View>
  );
};

MessageItem.propTypes = {
  direction: PropTypes.string,
  text: PropTypes.string,
};

export default MessageItem;
