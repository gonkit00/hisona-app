import React, { PropTypes, Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient, ImageManipulator } from 'expo';
import { PulseIndicator } from 'react-native-indicators';

import { connect } from 'react-redux';
import * as recogniseActions from '~/store/Recognise/actions';
import * as recogniseSelectors from '~/store/Recognise/reducer';

import { Actions } from 'react-native-router-flux';

class RecogniseScreen extends Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {
		const { uri } = this.props.photoData;
		const resizedImage = await this.resizeImageFromUri(uri);
		this.props.classifyImage(resizedImage.uri)
	}

	async resizeImageFromUri(uri) {
		const manipResult = await ImageManipulator.manipulate(
			uri,
			[{ resize: { width: 430, height: 820 } }],
			{ format: 'jpeg' }
		);
		return manipResult;
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
						<PulseIndicator animationDuration={2000} color="white" size={184} />
						<Image
							style={styles.hisonaLogo}
							source={require('../../assets/hisona_loading_logo.png')}
						/>
					</View>
					<Text style={styles.loadingText}>Recognising...</Text>
				</LinearGradient>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	hisonaLogo: {
		width: 124,
		height: 124,
		position: 'absolute'
	},
	loadingText: {
		color: '#fff',
    fontSize: 24,
    fontFamily: 'barlow-regular',
    alignSelf: 'center',
    marginBottom: 80
	}
});

const mapDispatchToProps = dispatch => ({
	classifyImage: imageUri => dispatch(recogniseActions.classifyImage(imageUri))
});

export default connect(null, mapDispatchToProps)(RecogniseScreen);
