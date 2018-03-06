import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { Camera, FileSystem, Permissions } from 'expo';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  actionsHeader: {
    backgroundColor: 'transparent',
    padding: 32,
  },
  dismissButton: {
    color: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  actionsFooter: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 32,
  },
  snapButton: {
    height: 80,
    width: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 40,
    borderColor: 'white',
    borderWidth: 4,
    alignSelf: 'flex-end',
  },
});

class CameraView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  componentDidMount() {
    FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory} photos`).catch(e => e);
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync().then((photoData) => {
        Actions.push('recogniseScreen', { photoData });
      });
    }
  }

  dismissView = () => {
    Actions.pop();
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Hisona cannot access your camera :(</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1 }}
          type={this.state.type}
          ref={(ref) => {
            this.camera = ref;
          }}
        >
          <View style={styles.actionsHeader}>
            <TouchableOpacity onPress={() => this.dismissView()}>
              <MaterialIcons name="close" size={32} style={styles.dismissButton} />
            </TouchableOpacity>
          </View>
          <View style={styles.actionsFooter}>
            <TouchableOpacity style={styles.snapButton} onPress={() => this.takePicture()} />
          </View>
        </Camera>
      </View>
    );
  }
}

export default CameraView;
