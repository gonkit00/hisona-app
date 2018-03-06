import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

const ChatItem = (props) => {
  const { artefact, thread, onViewThread } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        onViewThread(thread.conversation_id, artefact.artefact_id, artefact.artefact_name)
      }
    >
      <View style={styles.container}>
        <Image style={styles.artefactAvatar} source={{ uri: artefact.avatar_path }} />
        <View style={styles.containerDetails}>
          <Text style={thread.read ? styles.artefactNameRead : styles.artefactNameUnread}>
            {artefact.artefact_name}
          </Text>
          <Text style={styles.lastMessage}>{thread.last_message_subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ChatItem.propTypes = {
  artefact: PropTypes.object,
  thread: PropTypes.object,
  onViewThread: PropTypes.func,
};

export default ChatItem;
