import React, { PropTypes, Component } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableHighlight,
	Dimensions
} from 'react-native';
import { LinearGradient } from 'expo';

import RecogniseService from '~/services/recognise';
import { Actions } from 'react-native-router-flux';

class MatchScreen extends Component {
	constructor(props) {
		super(props);
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
						<Image
							style={styles.hisonaLogo}
							source={require('../../assets/hisona_trans.png')}
						/>
						<Text style={styles.greetingText}>Hola!</Text>
						<Image
							style={styles.artefactAvatar}
							source={{ uri: this.props.artefact.avatar_path }}
						/>
						<Text style={styles.nameText}>
							{this.props.artefact.artefact_name}
						</Text>
						<Text style={styles.locationText}>
							{this.props.artefact.location}
						</Text>

						<TouchableHighlight
							style={styles.button}
							onPress={() => this.onButtonPress()}
						>
							<Text style={styles.buttonText}>Start Conversation</Text>
						</TouchableHighlight>
					</View>
				</LinearGradient>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	hisonaLogo: {
		width: 40,
		height: 36,
		marginBottom: 32
	},
	artefactAvatar: {
		width: 140,
		height: 140,
		borderRadius: 70,
		borderColor: '#fff',
		borderWidth: 3,
		shadowColor: '#2575FC',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		margin: 32
	},
	greetingText: {
		color: '#fff',
		fontFamily: 'barlow-regular',
		fontSize: 32
	},
	nameText: {
		color: '#fff',
		fontFamily: 'barlow-regular',
		fontSize: 24
	},
	locationText: {
		marginTop: 16,
		color: '#e7e7e7',
		fontFamily: 'barlow-regular',
		fontSize: 20
	},
	button: {
		backgroundColor: 'transparent',
		height: 56,
		width: Dimensions.get('window').width,
		position: 'absolute',
    bottom: 0,
    padding: 16,
	},
	buttonText: {
		color: '#fff',
		fontFamily: 'barlow-medium',
		fontSize: 19,
		textAlign: 'center'
	}
});

export default MatchScreen;
