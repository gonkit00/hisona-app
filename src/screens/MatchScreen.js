import React, { PropTypes, Component } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { LinearGradient } from 'expo';

import RecogniseService from '~/services/recognise';
import { Actions } from 'react-native-router-flux';

class MatchScreen extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {

	}

	onButtonPress() {
		Actions.reset('root');
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
						<Text style={styles.loadingText}>Hello!</Text>
						<Image
							style={styles.artefactAvatar}
							source={{ uri: this.props.artefact.avatar_path }}
						/>
						<Text style={styles.loadingText}>
							{this.props.artefact.artefact_name}
						</Text>
						<Text style={styles.loadingText}>
							{this.props.artefact.locarion}
						</Text>
						<Button
							onPress={() => this.onButtonPress()}
							title="Start Conversation"
							style={styles.button}
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
	artefactAvatar: {
		width: 164,
		height: 164,
		borderRadius: 82,
		margin: 16
	},
	loadingText: {
		color: '#fff',
		fontSize: 20
	},
	button: {
		color: '#212121',
		backgroundColor: '#fff',
		padding: 32,
		flex: 1
	}
});

export default MatchScreen;
