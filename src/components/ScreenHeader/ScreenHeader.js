import React, { PropTypes } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import styles from './styles';

ScreenHeader.propTypes = {};

export default function ScreenHeader(props) {
	return (
		<View style={styles.headerContainer}>
			<Text>ScreenHeader</Text>
		</View>
	);
}


