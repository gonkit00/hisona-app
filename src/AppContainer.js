import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Font, Notifications } from 'expo';

import ChatsListScreen from '~/screens/ChatsListScreen';
import ChatScreen from '~/screens/ChatScreen';

import { Provider } from 'react-redux';
import Navigation from '~/Navigation';

import registerForPushNotificationsAsync from '~/services/notifications';

import configureStore from '~/store/configureStore';

const store = configureStore();

class AppContainer extends Component {
	constructor() {
		super();
		this.state = {
			isReady: false,
			notification: {}
		};
	}

	componentWillMount() {
		this.loadFonts();
		registerForPushNotificationsAsync();

		// Handle notifications that are received or selected while the app
		// is open. If the app was closed and then opened by tapping the
		// notification (rather than just tapping the app icon to open it),
		// this function will fire on the next tick after the app starts
		// with the notification data.
		this._notificationSubscription = Notifications.addListener(
			this._handleNotification
		);
	}

	async loadFonts() {
		await Font.loadAsync({
			'barlow-regular': require('../assets/fonts/BarlowSemiCondensed-Regular.otf'),
			'barlow-medium': require('../assets/fonts/BarlowSemiCondensed-Medium.otf'),
			'barlow-bold': require('../assets/fonts/BarlowSemiCondensed-Bold.otf')
		});
		this.setState({ isReady: true });
	}

	_handleNotification = notification => {
		this.setState({ notification });
	};

	render() {
		if (!this.state.isReady) {
			return <Expo.AppLoading />;
		}
		return (
			<Provider store={store}>
				<Navigation />
			</Provider>
		);
	}
}

export default AppContainer;
