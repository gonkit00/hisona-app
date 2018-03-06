import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  inputBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderTopColor: '#D9E0E6',
    borderTopWidth: 1,
  },

  textBox: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'barlow-regular',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 0,
  },

  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 8,
    paddingLeft: 8,
    marginRight: 8,
    borderRadius: 32,
    backgroundColor: '#2575FC',
  },
});
