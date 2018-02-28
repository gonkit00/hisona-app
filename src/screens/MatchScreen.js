import React, { PropTypes, Component } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { LinearGradient } from 'expo';

import RecogniseService from '~/services/recognise';
import { Actions } from 'react-native-router-flux';

class MatchScreen extends Component {
	constructor(props) {
		super(props);
	}

	async componentWillMount() {
		// const resizedImage = await this.resizeImageFromUri(uri);
		// const artefact = await RecogniseService.classifyImage(resizedImage.uri);
		// alert(JSON.stringify(artefact));
	}

	onButtonPress() {
		Actions.reset('chatScreen');
	}

	render() {
		return (
			<View>
				<LinearGradient
					style={{ height: '100%' }}
					start={[0.3, 0.3]}
					colors={['#2575FC', '#8C5DAA', '#E64D4D']}
				>
					<View style={styles.container}>
						<Image
							style={styles.hisonaLogo}
							source={require('../../assets/hisona_loading_logo.png')}
						/>
						<Text style={styles.loadingText}>Hello!</Text>
						<Button
							onPress={() => this.onButtonPress()}
							title="Start Conversation"
							color="#fff"
							accessibilityLabel="Start a conversation with a Hisona artefact"
						/>
					</View>
				</LinearGradient>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	hisonaLogo: {
		width: 124,
		height: 124
	},
	loadingText: {
		color: '#fff',
		fontSize: 16
	}
});

export default MatchScreen;
