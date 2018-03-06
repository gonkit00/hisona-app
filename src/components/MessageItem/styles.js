import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  messageBubble: {
    borderRadius: 16,
    marginTop: 16,
    marginRight: 8,
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    // flex: 1
  },

  messageBubbleLeft: {
    backgroundColor: '#E7E7E7',
  },

  messageBubbleTextLeft: {
    fontSize: 18,
    fontFamily: 'barlow-regular',
    color: '#212121',
  },

  messageBubbleRight: {
    backgroundColor: '#2575FC',
  },

  messageBubbleTextRight: {
    fontSize: 18,
    fontFamily: 'barlow-regular',
    color: 'white',
  },
});
