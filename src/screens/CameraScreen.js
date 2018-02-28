import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, FileSystem, Permissions } from 'expo';

import { Actions } from 'react-native-router-flux';

class CameraView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hasCameraPermission: null,
			type: Camera.Constants.Type.back
		};
	}

	async componentWillMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === 'granted' });
	}

	componentDidMount() {
		FileSystem.makeDirectoryAsync(
			`${FileSystem.documentDirectory} photos`
		).catch(e => {
			console.log(e, 'Directory exists');
		});
	}

	takePicture = async function() {
		if (this.camera) {
			this.camera.takePictureAsync().then(photoData => {
				// dispatch, recognise_image_request
				Actions.push('recogniseScreen', { photoData });
			});
		}
	};

	render() {
		const { hasCameraPermission } = this.state;
		if (hasCameraPermission === null) {
			return <View />;
		} else if (hasCameraPermission === false) {
			return <Text>Hisona can't access your camera :(</Text>;
		}
		return (
			<View style={{ flex: 1 }}>
				<Camera
					style={{ flex: 1 }}
					type={this.state.type}
					ref={ref => {
						this.camera = ref;
					}}
				>
					<View style={styles.actionsContainer}>
						<TouchableOpacity
							style={styles.snapButton}
							onPress={this.takePicture.bind(this)}
						/>
					</View>
				</Camera>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	actionsContainer: {
		flex: 1,
		backgroundColor: 'transparent',
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 24
	},
	snapButton: {
		height: 80,
		width: 80,
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		borderRadius: 40,
		borderColor: 'white',
		borderWidth: 3,
		alignSelf: 'flex-end'
	}
});

export default CameraView;
