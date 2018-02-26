import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import ChatsListScreen from '~/screens/ChatsListScreen';
import ChatView from '~/screens/ChatView';

import { Provider } from 'react-redux';

import configureStore from '~/store/configureStore';

const store = configureStore();

class AppContainer extends Component {
	render() {
		return (
			<Provider store={store}>
				<ChatView />
			</Provider>
		);
	}
}

export default AppContainer;
