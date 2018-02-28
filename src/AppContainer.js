import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import ChatsListScreen from '~/screens/ChatsListScreen';
import ChatScreen from '~/screens/ChatScreen';

import { Provider } from 'react-redux';
import Navigation from '~/Navigation';

import configureStore from '~/store/configureStore';

const store = configureStore();

class AppContainer extends Component {
	render() {
		return (
			<Provider store={store}>
				<Navigation />
			</Provider>
		);
	}
}

export default AppContainer;
