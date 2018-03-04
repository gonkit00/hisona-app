import React, { Component } from 'react';
import {
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import { LinearGradient } from 'expo';
import styles from './styles';

import { Actions } from 'react-native-router-flux';

export default class Header extends Component {
	_renderLeft() {
		return (
			<View style={styles.navBarItem}>
				<Text style={styles.headerTitle}>Hisona</Text>
			</View>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<LinearGradient
					style={{ height: '100%' }}
					start={[0.1, 0.4]}
					colors={['#2575FC', '#8C5DAA', '#E64D4D']}
				>
					<View style={styles.navItemsContainer}>
						{this._renderLeft()}
					</View>
				</LinearGradient>
			</View>
		);
	}
}
