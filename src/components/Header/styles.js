import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    height: 124,
  },
  navItemsContainer: {
    paddingTop: 32,
    paddingRight: 16,
    paddingLeft: 16,
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  navBarItem: {
    flex: 1,
  },
  headerTitle: {
    alignSelf: 'flex-start',
    fontSize: 32,
    fontFamily: 'barlow-bold',
    color: '#fff',
  },
  buttonAdd: {
    alignSelf: 'flex-end',
  },
});
